<template>
  <el-dialog :model-value="Boolean(user)" title="Edit groups"
    @close="close" @open="onOpen" >

    <div class="taglist" @click.capture="onGroupCancel">
      <el-tag
        v-for="group in groups"
        :key="group"
        class="mx-1"
        closable
        :disable-transitions="false"
        @close="removeGroup(group)"
      >
        {{ group }}
      </el-tag>
      <el-select
        v-if="inputVisible"
        filterable
        ref="InputRef"
        v-model="inputValue"
        placeholder="Select a group"
        @change="onGroupAdd"
        @keydown.esc.capture="onGroupCancel">
        <el-option
          v-for="item in displayInstanceFlags"
          :key="item[0]"
          :label="item[1]"
          :value="item[0]"
        >
        </el-option>
      </el-select>
      <el-button v-else class="button-new-tag" size="small" @click="addGroup">
        + Add Group
      </el-button>
    </div>

    <el-button type="primary" @click="save">Save</el-button>
  </el-dialog>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Edit, Delete } from '@element-plus/icons-vue';
import { UsersApi } from "@/api/users";
import { Group, GroupsApi } from "@/api/groups";

@Options({
  components: { Edit, Delete },
  props: { user: { type: String } },
})
export default class FlagsDialog extends Vue {
  private readonly user = ``;

  private instanceGroups: Group[] = [];

  private groups: string[] = [];

  private inputValue = ``;

  private inputVisible = false;

  close() {
    this.groups = [];
    this.onGroupCancel();
    this.$emit(`update:user`, null);
  }

  onOpen() {
    return this.fetchGroups();
  }

  get instance() {
    return this.$store.state.currentInstance;
  }

  get displayInstanceFlags() {
    return this.instanceGroups
      .filter((group) => !this.groups.includes(group.id))
      .map((group) => [group.id, group.description ? `${group.name} - ${group.description}` : group.name]);
  }

  async fetchGroups() {
    this.instanceGroups = await GroupsApi.getGroups(this.instance);

    this.groups = await UsersApi.getGroupsIds(this.user, this.instance);
  }

  async save() {
    await UsersApi.setGroupsIds(this.user, this.instance, this.groups);
    this.close();
  }

  addGroup() {
    this.inputVisible = true;

    this.$nextTick(() => {
      (this.$refs.InputRef as HTMLElement).focus();
    });
  }

  removeGroup(flagToRemove: string) {
    this.groups = this.groups.filter((flag) => flag !== flagToRemove);
  }

  onGroupAdd() {
    if (!this.inputValue) return;

    this.groups.push(this.inputValue);
    this.onGroupCancel();
  }

  onGroupCancel() {
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
