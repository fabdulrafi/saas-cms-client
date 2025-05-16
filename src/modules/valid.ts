import { computed, ref, toRaw } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { minLength, maxLength, required, email, sameAs, helpers } from '@vuelidate/validators';

import Swal from 'sweetalert2';
import moment from 'moment'

import { useApiWithAuth } from "@/modules/api";
import { useAuth } from '@/modules/auth';
import { useRouter } from 'vue-router';

import axios from 'axios';
import { AUTH_KEY } from '@/modules/auth';

export const useValid = (payload: any, field: any = []) => {
  const rules = computed(() => {
    const state: any = [];

    Object.keys(payload).forEach(key => {
      if (field.find(keys => keys === key)) return;

      // ✅ pengecualian
      if (key === 'qr_code_url') {
        state.push({
          [key]: {
            required: helpers.withMessage(`${key.replace(/_/g, ' ')} cannot be empty`, (val: string) => {
              return !payload.qr || !!val;
            }),
            url: helpers.withMessage(`${key.replace(/_/g, ' ')} must be a valid url`, (val: string) => {
              if (!payload.qr || !val) return true;
              try {
                new URL(val);
                return true;
              } catch (_) {
                return false;
              }
            }),
          }
        });
        return;
      }

      if (key === 'greeting_text') {
        state.push({
          [key]: {
            required: helpers.withMessage(`${key.replace(/_/g, ' ')} cannot be empty`, (val: string) => {
              return payload.greeting_type !== 'TEXT_IMAGE' || !!val;
            }),
          }
        });
        return;
      }

      if (key === 'unit_uuid') {
        state.push({
          [key]: {
            required: helpers.withMessage(`${key.replace(/_/g, ' ')} cannot be empty`, (val: string) => {
              return payload.type !== 'UNIT' || !!val;
            }),
          }
        });
        return;
      }

      if (key === 'signage_uuid') {
        state.push({
          [key]: {
            required: helpers.withMessage(`${key.replace(/_/g, ' ')} cannot be empty`, (val: string) => {
              return payload.type !== 'SIGNAGE' || !!val;
            }),
          }
        });
        return;
      }

      // default rule
      state.push({
        [key]: {
          required: helpers.withMessage(`${key.replace(/_/g, ' ')} cannot be empty`, required),
          ...(key.includes('email') && {
            email: helpers.withMessage('invalid email address', email)
          }),
          ...(key.includes('mobile') && {
            minLength: helpers.withMessage(
              ({
                $pending,
                $invalid,
                $params,
                $model
              }) => `phone number must be at least ${$params.min} characters long`,
              minLength(10)
            ),
            maxLength: helpers.withMessage(
              ({
                $pending,
                $invalid,
                $params,
                $model
              }) => `phone number must have a maximum length of ${$params.max} characters`,
              maxLength(13)
            )
          }),
          ...(key.includes('password') && {
            minLength: helpers.withMessage(
              ({
                $pending,
                $invalid,
                $params,
                $model
              }) => `password must be at least ${$params.min} characters long`,
              minLength(8)
            ),
            maxLength: helpers.withMessage(
              ({
                $pending,
                $invalid,
                $params,
                $model
              }) => `password must be at least ${$params.max} characters long`,
              maxLength(16)
            )
          }),
          ...(key.includes('confirm') && {
            sameAs: helpers.withMessage(`${key.replace(/_/g, ' ')} must be the same as the password`, sameAs(payload.new_password))
          }),
        }
      });
    });
    
    return state.reduce((a, b) => Object.assign(a, b), {});
  });
  
  const v$ = useVuelidate(rules, payload);

  const swalAlert = (msg = '', type = 'success') => {
    const toast: any = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      customClass: { container: 'toast' },
    });

    toast.fire({
      icon: type,
      title: msg,
      padding: '10px 20px',
    });
  };

  const swalAlertUpdate = async (msg = '', type = 'success') => {
    const toast: any = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: true,
      confirmButtonText: 'Yes, I am sure',
      confirmButtonColor: '#2A4896',
      showCancelButton: true,
      cancelButtonText: 'Close',
      cancelButtonColor: "#E7515A",
      timer: 6000,
      customClass: { container: 'toast' },
    });

    const result = await toast.fire({
      icon: type,
      title: msg,
      padding: '10px 20px',
    });

    if (result.isConfirmed) {
      return true;
    }

    else {
      return false;
    }
  };

  const swalAlertConfirm = async (msg = '', type = 'success', url = '', uuid = '') => {
    const toast: any = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: true,
      confirmButtonText: 'Yes, I am sure',
      confirmButtonColor: '#2A4896',
      showCancelButton: true,
      cancelButtonText: 'Close',
      cancelButtonColor: "#E7515A",
      timer: 6000,
      customClass: { container: 'toast' },
    });

    const result = await toast.fire({
      icon: type,
      title: msg,
      padding: '10px 20px',
    });

    if (result.isConfirmed) {
      const { loading, data, del, errorMessage } = useApiWithAuth(`${url}/${uuid}`);

      return del()
        .then(() => {
          return data.value;
        })
        .catch(() => {
          swalAlert(errorMessage.value, 'error');
        });
    }
  };

  const parseStringArray = (value: any): string[] => {
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return Array.isArray(value) ? value : [];
  };

  const sameArray = (arr: any) => {
    let result = arr.reduce((unique: any, o: any) => {
      if(!unique.some((obj: any) => obj.id === o.id)) {
        unique.push(o)
      }

      return unique
    },[]);

    return result.sort((a: any, b: any) => a.id - b.id);
  };

  const sameArrayNonObjects = (arr: any) => {
    let result = arr.reduce((unique: any, o: any) => {
      if(!unique.some((obj: any) => obj === o)) {
        unique.push(o)
      }

      return unique
    },[]);

    return result.sort((a: any, b: any) => a - b);
  };

  const addFieldChecked = (array: any) => {
    return array.map(item => ({
      ...item,
      checked: false,
      children: item.children ? addFieldChecked(item.children) : []
    }));
  };

  const removeChild = (object: any) => {
    return {
      ...object,
      children: []
    }
  };

  const deleteChild = (array_tree: any, array: any, parentId: number | string) => {
    for (let i = array.length - 1; i >= 0; i--) {
      if (array[i].parent_id === parentId) {
        for (let t = array_tree.length - 1; t >= 0; t--) {
          if (array_tree[t] === array[i].id) {
            array_tree.splice(t, 1);
          }
        }

      }
    }
  };

  const deleteChildObjects = (array: any, parentId: number | string) => {
    for (let i = array.length - 1; i >= 0; i--) {
      if (array[i].parent_id === parentId) {
        array.splice(i, 1);
      }
    }
  };

  interface TreeNode {
    id?: string;
    name?: string;
    children?: TreeNode[];
  }

  const deepClone = <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
  };

  const cloneArraysAndSyncObjects = (array1: TreeNode[], array2: TreeNode[]): TreeNode[] => {
    let clonedArray1 = deepClone(array1);
    const clonedArray2 = deepClone(array2);

    const syncNodes = (node1: TreeNode, node2: TreeNode) => {
      if (!node1.children) node1.children = [];
      if (!node2.children) node2.children = [];

      const childMap1 = new Map(node1.children.map(child => [child.id, child]));
      const childMap2 = new Map(node2.children.map(child => [child.id, child]));

      // Add new children or update existing ones
      for (const [id, child2] of childMap2) {
        if (!childMap1.has(id)) {
          node1.children.push(deepClone(child2));
        } else {
          syncNodes(childMap1.get(id)!, child2);
        }
      }

      // Remove children that don't exist in array2
      node1.children = node1.children.filter(child => childMap2.has(child.id));
    }

    // Sync root level nodes
    const rootMap1 = new Map(clonedArray1.map(node => [node.id, node]));
    const rootMap2 = new Map(clonedArray2.map(node => [node.id, node]));

    // Add new root nodes or update existing ones
    for (const [id, node2] of rootMap2) {
      if (!rootMap1.has(id)) {
        clonedArray1.push(deepClone(node2));
      } else {
        syncNodes(rootMap1.get(id)!, node2);
      }
    }

    // Remove root nodes that don't exist in array2
    clonedArray1 = clonedArray1.filter(node => rootMap2.has(node.id));

    return clonedArray1;
  };
  
  interface Action {
    name: string;
    checked?: boolean;
    [key: string]: any;
  }
  
  interface Tab {
    id: string;
    name: string;
    checked?: boolean;
    [key: string]: any;
  }

  interface MenuItem {
    name?: string;
    checked?: boolean;
    children?: MenuItem[];
    actions?: Action[];
    tabs?: Tab[];
    [key: string]: any; // For other properties
  }
  
  const mergeArrays = (arr1: MenuItem[], arr2: MenuItem[]): MenuItem[] => {
    // Create a map of items from arr1 for quick lookup
    const arr1Map = new Map(arr1.map(item => [item.name, item]));
  
    return arr2.map(item2 => {
      const item1 = arr1Map.get(item2.name);
      
      // If item doesn't exist in arr1, return item2 with default values
      if (!item1) {
        return {
          ...item2,
          checked: false,
          children: item2.children ? mergeArrays([], item2.children) : undefined,
          actions: item2.actions ? item2.actions.map(action => ({ ...action, checked: false })) : undefined,
          tabs: item2.tabs ? item2.tabs.map(tab => ({ ...tab, checked: false })) : undefined
        };
      }
  
      const merged = { ...item1 } as MenuItem;
  
      // Merge all properties except 'checked', 'children', 'actions', and 'tabs'
      Object.keys(item2).forEach(key => {
        if (!['checked', 'children', 'actions', 'tabs'].includes(key)) {
          merged[key] = item2[key];
        }
      });
  
      // Handle children recursively
      if (item2.children) {
        merged.children = mergeArrays(item1.children || [], item2.children);
      }
  
      // Handle actions
      if (item2.actions) {
        if (!item1.actions || item1.actions.length === 0) {
          merged.actions = item2.actions.map(action => ({ ...action, checked: false }));
        } else {
          merged.actions = mergeArrays(item1.actions, item2.actions) as Action[];
        }
      }
  
      // Handle tabs
      if (item2.tabs) {
        const existingTabs = new Set(item1.tabs ? item1.tabs.map(t => t.id) : []);
        merged.tabs = [
          ...(item1.tabs || []).filter(tab => item2.tabs!.some(t2 => t2.id === tab.id)),
          ...item2.tabs
            .filter(tab => !existingTabs.has(tab.id))
            .map(tab => ({ ...tab, checked: false }))
        ];
      }
  
      return merged;
    });
  };  

  const yearArray = () => {
    let max = new Date().getFullYear();
    let min = max - 5;
    let year: any = [];

    for (let i = max; i >= min; i--) {
      year.push({
        id: i,
        name: i
      })
    }

    return year;
  };

  const checkExistAct = (actName: string): boolean => {
    const router = useRouter();
    const { menu } = useAuth();

    const path = !actName.includes('#') ? router?.currentRoute?.value?.path : actName.split('#')[1];

    const valid = ref(false);

    const isValidAct = (menuItems: any[]): boolean => {
      for (const menuItem of menuItems) {
        if (menuItem.link === path) {
          for (const action of menuItem.actions) {
            if (action.name === actName && action.checked) {
              return true;
            }
          }
        }

        if (menuItem.children.length > 0) {
          if (isValidAct(menuItem.children)) {
            return true;
          }
        }
      }

      return false;
    };

    if (menu?.value) {
      valid.value = isValidAct(toRaw(menu.value));
    }

    return valid.value;
  };

  const checkExistTab = () => {
    const router = useRouter();
    const { menu } = useAuth();

    const path = router?.currentRoute?.value?.path;

    const tabs = ref([]);

    const isValidTab = (menuItems: any[]) => {
      for (const menuItem of menuItems) {
        if (menuItem.link === path) {
          return menuItem.tabs.filter(e => e.checked);
        }

        if (menuItem.children && menuItem.children.length > 0) {
          const childResult = isValidTab(menuItem.children);
          
          if (childResult.length > 0) {
            return childResult;
          }
        }
      }

      return [];
    };

    if (menu?.value) {
      tabs.value = isValidTab(toRaw(menu.value));
    }

    return tabs.value;
  };

  interface ColumnDefinition {
    field: string;
    value: string;
    condition?: string;
    [key: string]: any;
  };

  const arrayToFieldValueObject = (arr: ColumnDefinition[]): { [key: string]: string } => {
    return arr.reduce((acc, item) => {
      let cdtn =
        item.condition === 'contain' ? 'con' :
        item.condition === 'not_contain' ? 'ncon' :
        item.condition === 'equal' ? 'eq' :
        item.condition === 'not_equal' ? 'neq' :
        item.condition === 'start_with' ? 'stw' :
        item.condition === 'end_with' ? 'enw' :
        item.condition === 'greater_than' ? 'gt' :
        item.condition === 'greater_than_equal' ? 'gte' :
        item.condition === 'less_than' ? 'lt' :
        item.condition === 'less_than_equal' ? 'lte' :
        item.condition === 'between' ? 'btw' :
        item.condition === 'not_between' ? 'nbtw' :
        item.condition === 'in' ? 'in' :
        item.condition === 'not_in' ? 'nin' :
        item.condition === 'is_null' ? 'isn' :
        item.condition === 'is_not_null' ? 'inn' :
        // optional
        item.condition === 'like' ? 'lk' :
        item.condition === 'not_like' ? 'nlk' :
        item.condition === 'regexp' ? 'rgx' :
        item.condition === 'not_regexp' ? 'nrgx' :
        item.condition === 'is_empty' ? 'ise' :
        item.condition === 'is_not_empty' ? 'isne' : '';

      if (item.field && item.value !== undefined) {
        acc[`${item.field}[${cdtn}]`] = item.value;
      }

      return acc;
    }, {} as { [key: string]: string });
  };

  const updateOrAddFields = (params: any, dataFilters: ColumnDefinition[]) => {
    const updatedParams = { ...params };

    const newFields = arrayToFieldValueObject(dataFilters);

    Object.entries(newFields).forEach(([newField, newValue]) => {
      const fieldName = newField.split('[')[0];

      Object.keys(updatedParams).forEach(key => {
        if (key.startsWith(fieldName + '[')) {
          delete updatedParams[key];
        }
      });

      updatedParams[newField] = newValue;

      if (newValue === '') {
        delete updatedParams[`${fieldName}[]`];
      }
    });

    return updatedParams;
  };

  const getStartEndDateIMonth = () => {
    const today = new Date();

    const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  
    return `${moment(startDate).format('YYYY-MM-DD')}::${moment(endDate).format('YYYY-MM-DD')}`;
  };

  const detectFileType = (url) => {
    const pdfRegex = /\.pdf$/i;
    const imageRegex = /\.(jpeg|jpg|png|gif|bmp|svg|webp)$/i;
  
    if (pdfRegex.test(url)) {
      return 'pdf';
    } else if (imageRegex.test(url)) {
      return 'image';
    } else {
      return 'unknown';
    }
  };

  const deleteFile = async (url) => {
    const toast: any = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: true,
      confirmButtonText: 'Yes, I am sure',
      confirmButtonColor: '#2A4896',
      showCancelButton: true,
      cancelButtonText: 'Close',
      cancelButtonColor: "#E7515A",
      timer: 6000,
      customClass: { container: 'toast' },
    });

    const result = await toast.fire({
      icon: 'warning',
      title: 'Are you sure you want to delete this file?',
      padding: '10px 20px',
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_CDN}upload-remove`,
          { url },
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(AUTH_KEY)}`
            }
          }
        );

        return response.data;
      } catch (error) {
        console.log(error);

        swalAlert('Failed delete file', 'error');
        
        return null;
      }
    } else {
      return null;
    }
  };

  return {
    v$,
    swalAlert,
    swalAlertUpdate,
    swalAlertConfirm,
    parseStringArray,
    sameArray,
    sameArrayNonObjects,
    addFieldChecked,
    cloneArraysAndSyncObjects,
    mergeArrays,
    yearArray,
    checkExistAct,
    checkExistTab,
    updateOrAddFields,
    getStartEndDateIMonth,
    detectFileType,
    deleteFile,
  };
};

// replace(/(\d)/, ' $1') => add space between number