import { ElMessageBox, ElMessageBoxOptions } from "element-plus";

export async function alert(title: string, message: string, options: ElMessageBoxOptions = {}): Promise<void> {
  await ElMessageBox.alert(message, title, options);
};

export async function confirm(title: string, message: string, options: ElMessageBoxOptions = {}, yes: string = 'OK', no: string = 'Cancel'): Promise<boolean> {
  try {
    await ElMessageBox.confirm(message, title, {
      ...options, confirmButtonText: yes, cancelButtonText: no
    });

    return true;
  } catch(e) {
    return false;
  }
};

export async function prompt(title: string, message: string, defaultValue: string = '', options: ElMessageBoxOptions = {}, yes: string = 'OK', no: string = 'Cancel'): Promise<string | null> {
  try {
    const result = await ElMessageBox.prompt(message, title, {
      ...options, inputValue: defaultValue, confirmButtonText: yes, cancelButtonText: no
    });

    return result.value;
  } catch(e) {
    return null;
  }
};