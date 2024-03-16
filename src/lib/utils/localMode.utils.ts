import {LOCALMODE_KEY} from "../constants";
import {LocalModeListType, LocalModeType} from "../types/localMode.type";

export class LocalMode {
  static getLists(): LocalModeType | null {
    let localModeData: LocalModeType | null = null;
    try {
      const localItem = localStorage.getItem(LOCALMODE_KEY);
      if (localItem) {
        const parsedItem: LocalModeType = JSON.parse(localItem);
        if (parsedItem?.lists[0]?.info?.id) {
          localModeData = parsedItem;
        }
      }
    } catch {
      console.log("LocalMode nothing found localstorage");
    }
    return localModeData;
  }

  static getList(listId: number): LocalModeListType | null {
    const local: LocalModeType | null = this.getLists();

    if (!local) {
      return null;
    }

    return (
      local.lists.find((localList) => {
        if (localList.info.id === listId) {
          return true;
        }
        return false;
      }) || null
    );
  }

  static setList(list: LocalModeListType): void {
    const local: LocalModeType = this.getLists() || {lists: []};
    let settedList = false;

    local.lists.forEach((localList, index) => {
      if (localList.info.id === list.info.id) {
        local.lists[index] = list;
        settedList = true;
      }
    });

    if (!settedList) {
      local.lists.push(list);
    }

    localStorage.setItem(LOCALMODE_KEY, JSON.stringify(local));
  }

  static deleteList(deleteListId: number): boolean {
    const local: LocalModeType | null = this.getLists();
    let deletedList = false;

    if (!local) {
      return false;
    }

    local.lists = local.lists.filter((localList) => {
      if (localList.info.id === deleteListId) {
        deletedList = true;
        return false;
      }
      return true;
    });

    if (deletedList) {
      localStorage.setItem(LOCALMODE_KEY, JSON.stringify(local));
      return true;
    }

    return false;
  }
}
