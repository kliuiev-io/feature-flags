<template>
  <el-dialog :model-value="Boolean(group)" title="Edit flags"
    @close="close" @open="onOpen" >

    <div class="taglist" @click.capture="onFlagCancel">
      <el-tag
        v-for="flag in flags"
        :key="flag"
        class="mx-1"
        closable
        :disable-transitions="false"
        @close="removeFlag(flag)"
      >
        {{ flag }}
      </el-tag>
      <el-select
        v-if="inputVisible"
        filterable
        ref="InputRef"
        v-model="inputValue"
        placeholder="Select a flag"
        @change="onFlagAdd"
        @keydown.esc.capture="onFlagCancel">
        <el-option
          v-for="item in displayInstanceFlags"
          :key="item[0]"
          :label="item[1]"
          :value="item[0]"
        >
        </el-option>
      </el-select>
      <el-button v-else class="button-new-tag" size="small" @click="addFlag">
        + New Tag
      </el-button>
    </div>

    <el-button type="primary" @click="save">Save</el-button>
  </el-dialog>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Edit, Delete } from '@element-plus/icons-vue';
import { Flags, InstancesApi } from "@/api/instances";
import { GroupsApi } from "@/api/groups";

@Options({
  components: { Edit, Delete },
  props: { group: { type: String } },
})
export default class FlagsDialog extends Vue {
  private readonly group = `instance-name`;

  private instanceFlags: Flags = {};

  private flags: string[] = [];

  private inputValue = ``;

  private inputVisible = false;

  close() {
    this.flags = [];
    this.onFlagCancel();
    this.$emit(`update:group`, null);
  }

  onOpen() {
    return this.fetchFlags();
  }

  get instance() {
    return this.$store.state.currentInstance;
  }

  get displayInstanceFlags() {
    return Object.values(this.instanceFlags)
      .filter((flag) => !this.flags.includes(flag.id))
      .map((flag) => [flag.id, flag.description ? `${flag.id} - ${flag.description}` : flag.id]);
  }

  async fetchFlags() {
    this.instanceFlags = await InstancesApi.getFlags(this.instance);

    this.flags = await GroupsApi.getFlags(this.group, this.instance);
  }

  async save() {
    await GroupsApi.setFlags(this.group, this.instance, this.flags);
    this.close();
  }

  addFlag() {
    this.inputVisible = true;

    this.$nextTick(() => {
      (this.$refs.InputRef as HTMLElement).focus();
    });
  }

  removeFlag(flagToRemove: string) {
    this.flags = this.flags.filter((flag) => flag !== flagToRemove);
  }

  onFlagAdd() {
    if (!this.inputValue) return;

    this.flags.push(this.inputValue);
    this.onFlagCancel();
  }

  onFlagCancel() {
    this.inputValue = ``;
    this.inputVisible = false;
  }
}
</script>

<style lang="scss" scoped>
.taglist {
  border: 1px dotted gray;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 10px;
}

.el-tag {
  margin-right: 5px;
}
</style>
