import { ref, watch } from 'vue';
import { useApiWithAuth } from '@/modules/api';
import { useAuth } from '@/modules/auth';

import IconMenu from '@/components/icon/icon-menu.vue';
import IconXCircle from '@/components/icon/icon-x-circle.vue';
import IconSun from '@/components/icon/icon-sun.vue';
import IconMoon from '@/components/icon/icon-moon.vue';
import IconLaptop from '@/components/icon/icon-laptop.vue';
import IconMailDot from '@/components/icon/icon-mail-dot.vue';
import IconArrowLeft from '@/components/icon/icon-arrow-left.vue';
import IconInfoCircle from '@/components/icon/icon-info-circle.vue';
import IconBellBing from '@/components/icon/icon-bell-bing.vue';
import IconMail from '@/components/icon/icon-mail.vue';

import IconMenuDashboard from '@/components/icon/menu/icon-menu-dashboard.vue';
import IconMenuFontIcons from '@/components/icon/menu/icon-menu-font-icons.vue';
import IconUser from '@/components/icon/icon-user.vue';
import IconDesktop from '@/components/icon/icon-desktop.vue';
import IconBox from '@/components/icon/icon-box.vue';
import IconMenuNotes from '@/components/icon/menu/icon-menu-notes.vue';
import IconMenuUsers from '@/components/icon/menu/icon-menu-users.vue';
import IconSettings from '@/components/icon/icon-settings.vue';
import IconMenuDatatables from '@/components/icon/menu/icon-menu-datatables.vue';
import IconMenuDocumentation from '@/components/icon/menu/icon-menu-documentation.vue';
import IconOpenBook from '@/components/icon/icon-open-book.vue';
import IconMenuChat from '@/components/icon/menu/icon-menu-chat.vue';
import IconMenuTodo from '@/components/icon/menu/icon-menu-todo.vue';
import IconMinus from '@/components/icon/icon-minus.vue';

import IconMenuScrumboard from '@/components/icon/menu/icon-menu-scrumboard.vue';
import IconMenuContacts from '@/components/icon/menu/icon-menu-contacts.vue';
import IconMenuInvoice from '@/components/icon/menu/icon-menu-invoice.vue';
import IconMenuCalendar from '@/components/icon/menu/icon-menu-calendar.vue';
import IconMenuElements from '@/components/icon/menu/icon-menu-elements.vue';
import IconMenuCharts from '@/components/icon/menu/icon-menu-charts.vue';
import IconMenuWidgets from '@/components/icon/menu/icon-menu-widgets.vue';
import IconMenuDragAndDrop from '@/components/icon/menu/icon-menu-drag-and-drop.vue';
import IconMenuTables from '@/components/icon/menu/icon-menu-tables.vue';
import IconMenuForms from '@/components/icon/menu/icon-menu-forms.vue';
import IconMenuPages from '@/components/icon/menu/icon-menu-pages.vue';
import IconMultipleForwardRight from '@/components/icon/icon-multiple-forward-right.vue';
import IconListCheck from '@/components/icon/icon-list-check.vue';
import IconTag from '@/components/icon/icon-tag.vue';
import IconFolder from '@/components/icon/icon-folder.vue';
import IconTrendingUp from '@/components/icon/icon-trending-up.vue';
import IconBarChart from '@/components/icon/icon-bar-chart.vue';
import IconChartSquare from '@/components/icon/icon-chart-square.vue';
import IconGallery from '@/components/icon/icon-gallery.vue';
import IconCalendar from '@/components/icon/icon-calendar.vue';
import IconNotes from '@/components/icon/icon-notes.vue';
import IconClipboardText from '@/components/icon/icon-clipboard-text.vue';
import IconAward from '@/components/icon/icon-award.vue';
import IconBookmark from '@/components/icon/icon-bookmark.vue';
import IconShoppingCart from '@/components/icon/icon-shopping-cart.vue';
import IconShoppingBag from '@/components/icon/icon-shopping-bag.vue';
import IconLayout from '@/components/icon/icon-layout.vue';
import IconPhoneCall from '@/components/icon/icon-phone-call.vue';
import IconHelpCircle from '@/components/icon/icon-help-circle.vue';
import IconBook from '@/components/icon/icon-book.vue';
import IconX from '@/components/icon/icon-x.vue';
import IconChecks from '@/components/icon/icon-checks.vue';

// dashboard
import IconDashboard from '/assets/icons/dashboard.svg';
import IconGuestControl from '/assets/icons/guest_control.svg';
import IconFoodOrder from '/assets/icons/food_order.svg';
import IconPromotion from '/assets/icons/promotion.svg';
import IconInformation from '/assets/icons/information.svg';
import IconAddOns from '/assets/icons/add_ons.svg';
import IconDirectNotification from '/assets/icons/direct_notification.svg';
import IconReports from '/assets/icons/reports.svg';
import IconProfile from '/assets/icons/profile.svg';
import IconSubscription from '/assets/icons/subscription.svg';
import IconMasterUnit from '/assets/icons/master_unit.svg';
import IconMasterScreen from '/assets/icons/master_screen.svg';
import IconMasterTag from '/assets/icons/master_tag.svg';
import IconUnitSetting from '/assets/icons/unit_setting.svg';
import IconUserRole from '/assets/icons/user_role.svg';
import IconUserGuide from '/assets/icons/user_guide.svg';
import IconTicketSupport from '/assets/icons/ticket_support.svg';
import IconContactUs from '/assets/icons/contact_us.svg';

// new icons
import dashboard_gray from '/assets/figma/icon/dashboard_gray.svg';
import dashboard_white from '/assets/figma/icon/dashboard_white.svg';
import guest_control_gray from '/assets/figma/icon/guest_control_gray.svg';
import guest_control_white from '/assets/figma/icon/guest_control_white.svg';
import food_order_gray from '/assets/figma/icon/food_order_gray.svg';
import food_order_white from '/assets/figma/icon/food_order_white.svg';
import promotion_gray from '/assets/figma/icon/promotion_gray.svg';
import promotion_white from '/assets/figma/icon/promotion_white.svg';
import information_gray from '/assets/figma/icon/information_gray.svg';
import information_white from '/assets/figma/icon/information_white.svg';
import add_on_gray from '/assets/figma/icon/add_on_gray.svg';
import add_on_white from '/assets/figma/icon/add_on_white.svg';
import direct_notification_gray from '/assets/figma/icon/direct_notification_gray.svg';
import direct_notification_white from '/assets/figma/icon/direct_notification_white.svg';
import reports_gray from '/assets/figma/icon/reports_gray.svg';
import reports_white from '/assets/figma/icon/reports_white.svg';
import settings_gray from '/assets/figma/icon/settings_gray.svg';
import settings_white from '/assets/figma/icon/settings_white.svg';
import subscription_gray from '/assets/figma/icon/subscription_gray.svg';
import subscription_white from '/assets/figma/icon/subscription_white.svg';
import master_data_gray from '/assets/figma/icon/master_data_gray.svg';
import master_data_white from '/assets/figma/icon/master_data_white.svg';
import unit_settings_gray from '/assets/figma/icon/unit_settings_gray.svg';
import unit_settings_white from '/assets/figma/icon/unit_settings_white.svg';
import media_gray from '/assets/figma/icon/media_gray.svg';
import media_white from '/assets/figma/icon/media_white.svg';
import user_role_gray from '/assets/figma/icon/user_role_gray.svg';
import user_role_white from '/assets/figma/icon/user_role_white.svg';
import user_guide_gray from '/assets/figma/icon/user_guide_gray.svg';
import user_guide_white from '/assets/figma/icon/user_guide_white.svg';
import ticket_support_gray from '/assets/figma/icon/ticket_support_gray.svg';
import ticket_support_white from '/assets/figma/icon/ticket_support_white.svg';
import contact_us_gray from '/assets/figma/icon/contact_us_gray.svg';
import contact_us_white from '/assets/figma/icon/contact_us_white.svg';

const icons = {
  IconMenuDashboard, IconMenuFontIcons, IconDesktop, IconBox, IconMenuNotes,
  IconMenuUsers, IconSettings, IconMenuDocumentation, IconUser, IconOpenBook,
  IconMenuChat, IconMenuTodo, IconMenuDatatables, IconMinus, IconMenu,
  IconLaptop, IconMailDot, IconArrowLeft, IconMultipleForwardRight,
  IconInfoCircle, IconBellBing, IconMail, IconMenuScrumboard, IconMenuContacts,
  IconMenuInvoice, IconMenuCalendar, IconMenuElements, IconMenuCharts, IconMenuWidgets,
  IconMenuDragAndDrop, IconMenuTables, IconMenuForms, IconMenuPages, IconListCheck,
  IconTag, IconFolder, IconTrendingUp, IconBarChart, IconChartSquare, IconGallery, IconCalendar,
  IconNotes, IconClipboardText, IconAward, IconBookmark, IconShoppingCart, IconShoppingBag, 
  IconLayout, IconPhoneCall, IconHelpCircle, IconBook, IconX, IconChecks,

  IconDashboard, IconGuestControl, IconFoodOrder, IconPromotion, IconInformation, IconAddOns, 
  IconDirectNotification, IconReports, IconProfile, IconSubscription, IconMasterUnit, IconMasterScreen, 
  IconMasterTag, IconUnitSetting, IconUserRole, IconUserGuide, IconTicketSupport, IconContactUs,


  dashboard_gray, guest_control_gray, food_order_gray, promotion_gray, information_gray, add_on_gray,
  direct_notification_gray, reports_gray, settings_gray, subscription_gray, master_data_gray, unit_settings_gray, 
  media_gray, user_role_gray, user_guide_gray, ticket_support_gray, contact_us_gray,

  dashboard_white, guest_control_white, food_order_white, promotion_white, information_white, add_on_white,
  direct_notification_white, reports_white, settings_white, subscription_white, master_data_white, unit_settings_white,
  media_white, user_role_white, user_guide_white, ticket_support_white, contact_us_white,
};

export const useIcons = () => { return icons; };

export const useArraymenus = (actived: boolean = false) => {
  const arrays = ref<any[]>([]);

  arrays.value = [
    {
      name: 'MAIN MENU',
      icon: 'dashboard_gray',
      icon_active: 'dashboard_white',
      link: '/main-menu',
      checked: actived,
      children: [
        {
          name: 'Dashboard',
          icon: 'dashboard_gray',
          icon_active: 'dashboard_white',
          link: '/main-menu/dashboard',
          checked: actived,
          children: [],
          actions: [],
          tabs: []
        },
        {
          name: 'Guest Control',
          icon: 'guest_control_gray',
          icon_active: 'guest_control_white',
          link: '/main-menu/guest-control',
          checked: actived,
          children: [],
          actions: [],
          tabs: []
        },
        {
          name: 'Food Order',
          icon: 'food_order_gray',
          icon_active: 'food_order_white',
          link: '/main-menu/food-order',
          checked: actived,
          children: [],
          actions: [],
          tabs: []
        },
        {
          name: 'Promotion',
          icon: 'promotion_gray',
          icon_active: 'promotion_white',
          link: '/main-menu/promotion',
          checked: actived,
          children: [
            {
              name: 'Screen Saver',
              icon: 'IconMinus',
              link: '/main-menu/promotion/screen-saver',
              checked: actived,
              children: [],
              actions: [],
              tabs: []
            },
            {
              name: 'Digital Signage',
              icon: 'IconMinus',
              link: '/main-menu/promotion/digital-signage',
              checked: actived,
              children: [],
              actions: [],
              tabs: []
            },
            {
              name: 'App Promotion',
              icon: 'IconMinus',
              link: '/main-menu/promotion/app-promotion',
              checked: actived,
              children: [],
              actions: [],
              tabs: []
            },
          ],
          actions: [],
          tabs: []
        },
        {
          name: 'Information',
          icon: 'information_gray',
          icon_active: 'information_white',
          link: '/main-menu/information',
          checked: actived,
          children: [
            {
              name: 'Facility',
              icon: 'IconMinus',
              link: '/main-menu/information/facility',
              checked: actived,
              children: [],
              actions: [],
              tabs: []
            },
            {
              name: 'Greeting',
              icon: 'IconMinus',
              link: '/main-menu/information/greeting',
              checked: actived,
              children: [],
              actions: [],
              tabs: []
            },
          ],
          actions: [],
          tabs: []
        },
        {
          name: 'Leisure',
          icon: 'add_on_gray',
          icon_active: 'add_on_white',
          link: '/main-menu/leisure',
          checked: actived,
          children: [
            {
              name: 'Tourism',
              icon: 'IconMinus',
              link: '/main-menu/leisure/tourism',
              checked: actived,
              children: [],
              actions: [],
              tabs: []
            },
            {
              name: 'Culinary',
              icon: 'IconMinus',
              link: '/main-menu/leisure/culinary',
              checked: actived,
              children: [],
              actions: [],
              tabs: []
            },
            {
              name: 'Gift',
              icon: 'IconMinus',
              link: '/main-menu/leisure/gift',
              checked: actived,
              children: [],
              actions: [],
              tabs: []
            },
            {
              name: 'Holiday Package',
              icon: 'IconMinus',
              link: '/main-menu/leisure/holiday-package',
              checked: actived,
              children: [],
              actions: [],
              tabs: []
            },
            {
              name: 'Transportation Rent',
              icon: 'IconMinus',
              link: '/main-menu/leisure/transportation-rent',
              checked: actived,
              children: [],
              actions: [],
              tabs: []
            },
            {
              name: 'Airport Schedule',
              icon: 'IconMinus',
              link: '/main-menu/leisure/airport-schedule',
              checked: actived,
              children: [],
              actions: [],
              tabs: []
            },
            {
              name: 'CCTV',
              icon: 'IconMinus',
              link: '/main-menu/leisure/cctv',
              checked: actived,
              children: [],
              actions: [],
              tabs: []
            },
          ],
          actions: [],
          tabs: []
        },
        {
          name: 'Direct Notification',
          icon: 'direct_notification_gray',
          icon_active: 'direct_notification_white',
          link: '/main-menu/direct-notification',
          checked: actived,
          children: [],
          actions: [],
          tabs: []
        },
        {
          name: 'Reports',
          icon: 'reports_gray',
          icon_active: 'reports_white',
          link: '/main-menu/reports',
          checked: actived,
          children: [],
          actions: [],
          tabs: []
        },
      ],
      actions: [],
      tabs: []
    },
    {
      name: 'SETTINGS',
      icon: 'settings_gray',
      icon_active: 'settings_white',
      link: '/settings',
      checked: actived,
      children: [
        {
          name: 'Company',
          icon: 'settings_gray',
          icon_active: 'settings_white',
          link: '/settings/company',
          checked: actived,
          children: [],
          actions: [],
          tabs: []
        },
        {
          name: 'Subscription',
          icon: 'subscription_gray',
          icon_active: 'subscription_white',
          link: '/settings/subscription',
          checked: actived,
          children: [],
          actions: [],
          tabs: []
        },
        {
          name: 'Master Unit',
          icon: 'master_data_gray',
          icon_active: 'master_data_white',
          link: '/settings/master-unit',
          checked: actived,
          children: [],
          actions: [],
          tabs: []
        },
        {
          name: 'Master Screen',
          icon: 'master_data_gray',
          icon_active: 'master_data_white',
          link: '/settings/master-screen',
          checked: actived,
          children: [],
          actions: [],
          tabs: []
        },
        {
          name: 'Master Tag',
          icon: 'master_data_gray',
          icon_active: 'master_data_white',
          link: '/settings/master-tag',
          checked: actived,
          children: [],
          actions: [],
          tabs: []
        },
        {
          name: 'Unit Setting',
          icon: 'unit_settings_gray',
          icon_active: 'unit_settings_white',
          link: '/settings/unit-setting',
          checked: actived,
          children: [
            {
              name: 'Wallpaper',
              icon: 'IconMinus',
              link: '/settings/unit-setting/wallpaper',
              checked: actived,
              children: [],
              actions: [],
              tabs: []
            },
            {
              name: 'Theme',
              icon: 'IconMinus',
              link: '/settings/unit-setting/theme',
              checked: actived,
              children: [],
              actions: [],
              tabs: []
            },
            {
              name: 'Apps Menu',
              icon: 'IconMinus',
              link: '/settings/unit-setting/apps-menu',
              checked: actived,
              children: [],
              actions: [],
              tabs: []
            },
            {
              name: 'Running Text',
              icon: 'IconMinus',
              link: '/settings/unit-setting/running-text',
              checked: actived,
              children: [],
              actions: [],
              tabs: []
            },
            {
              name: 'Information Slider',
              icon: 'IconMinus',
              link: '/settings/unit-setting/information-slider',
              checked: actived,
              children: [],
              actions: [],
              tabs: []
            },
            {
              name: 'Linier Channel',
              icon: 'IconMinus',
              link: '/settings/unit-setting/linier-channel',
              checked: actived,
              children: [],
              actions: [],
              tabs: []
            },
            {
              name: 'Wifi',
              icon: 'IconMinus',
              link: '/settings/unit-setting/wifi',
              checked: actived,
              children: [],
              actions: [],
              tabs: []
            },
            {
              name: 'Emergency',
              icon: 'IconMinus',
              link: '/settings/unit-setting/emergency',
              checked: actived,
              children: [],
              actions: [],
              tabs: []
            },
            {
              name: 'Casting',
              icon: 'IconMinus',
              link: '/settings/unit-setting/casting',
              checked: actived,
              children: [],
              actions: [],
              tabs: []
            },
          ],
          actions: [],
          tabs: []
        },
        {
          name: 'Media',
          icon: 'master_data_gray',
          icon_active: 'master_data_white',
          link: '/settings/media',
          checked: actived,
          children: [],
          actions: [],
          tabs: []
        },
        {
          name: 'User Role',
          icon: 'user_role_gray',
          icon_active: 'user_role_white',
          link: '/settings/user-role',
          checked: actived,
          children: [],
          actions: [],
          tabs: []
        },
      ],
      actions: [],
      tabs: []
    },
    {
      name: 'SUPPORT',
      icon: 'user_guide_gray',
      icon_active: 'user_guide_white',
      link: '/support',
      checked: actived,
      children: [
        {
          name: 'User Guide',
          icon: 'user_guide_gray',
          icon_active: 'user_guide_white',
          link: '/support/user-guide',
          checked: actived,
          children: [],
          actions: [],
          tabs: []
        },
        {
          name: 'Ticket Support',
          icon: 'ticket_support_gray',
          icon_active: 'ticket_support_white',
          link: '/support/ticket-support',
          checked: actived,
          children: [],
          actions: [],
          tabs: []
        },
        {
          name: 'Contact Us',
          icon: 'contact_us_gray',
          icon_active: 'contact_us_white',
          link: '/support/contact-us',
          checked: actived,
          children: [],
          actions: [],
          tabs: []
        },
      ],
      actions: [],
      tabs: []
    },
  ]

  return { arrays };
};

export const useMenu = () => {
  const rows = ref<any[]>([]);

  const { loading, error, data, get } = useApiWithAuth('profile/detail-role');

  get();

  watch([data, loading], () => {
    if (!loading.value && data.value?.data?.role_menu_json_array) {
      // rows.value = data.value.data.role_menu_json_array;

      rows.value = useArraymenus(true).arrays.value;
    }
  });

  return { rows, icons }
};

interface MenuItem {
  link?: string;
  checked?: boolean;
  children?: MenuItem[];
};

export const useValidRouter = () => {
  const { menu } = useAuth();

  const isValidRoute = (item: MenuItem, path: string): boolean => {
    if (item.link === path && item.checked) {
      return true;
    }

    if (item.children) {
      return item.children.some(child => isValidRoute(child, path));
    }

    return false;
  };

  const validRoute = (path: string) => {
    const valid = ref(false);

    if (menu?.value) {
      valid.value = menu.value.some(item => isValidRoute(item, path));
    }

    return valid;
  }

  return { validRoute };
};

const findFirstCheckedLink = (menu: MenuItem[]): string => {
  for (const item of menu) {
    if (item.checked && item.children && item.children.length < 1) {
      return item.link ?? '/main-menu/dashboard';
    }

    if (item.children && item.children.length > 0) {
      const childLink = findFirstCheckedLink(item.children);

      if (childLink !== '/main-menu/dashboard') {
        return childLink;
      }
    }
  }

  return '/main-menu/dashboard';
};

export const useFirstCheckedLink = () => {
  const { menu } = useAuth();
  const first = ref('/main-menu/dashboard');

  if (menu?.value) {
    first.value = findFirstCheckedLink(menu?.value);
  }

  return first;
};
