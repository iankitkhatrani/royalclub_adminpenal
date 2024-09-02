export const MENUITEMS = [
  {
    menutitle: "Dashboard",
    menucontent: "Dashboards",
    Items: [
      { path: `/dashboard`, icon: "home", title: "Dashboard", activeTitle: "Dashboard", type: "link" },

    ],
  },
  {
    menutitle: "General",
    menucontent: "Dashboards,Widgets",
    Items: [
      {
        title: "Admin",
        icon: "user",
        path: `/admin/admin_list`,
        activeTitle: "admin",
        type: "sub",
        bookmark: true,
        active: false,
        children: [
          { path: `/admin/admin_list`, icon: "staff", title: "Admin Management", activeTitle: "admin_list", type: "link" },
          { path: `/admin/admin_transcation`, activeTitle: "admin_transcation", type: "link", title: "Admin Transcation" },
        ],
      },
      {
        title: "Agent",
        icon: "user",
        path: `/agent/agent_list`,
        activeTitle: "agent",
        type: "sub",
        bookmark: false,
        active: false,
        children: [
          { path: `/agent/agent_list`, icon: "staff", title: "Agent Management", activeTitle: "agent_list", type: "link" },
          { path: `/agent/agent_transcation`, activeTitle: "agent_transcation", type: "link", title: "Agent Transcation" },
        ],
      },
      {
        title: "Users",
        icon: "user",
        path: `/users/user_list`,
        activeTitle: "users",
        type: "sub",
        bookmark: true,
        active: false,
        children: [
          { path: `/users/user_list`, icon: "staff", title: "Users Management", activeTitle: "user_list", type: "link" },
          { path: `/users/user_transcation`, activeTitle: "user_transcation", type: "link", title: "Users Transcation" },
        ],
      },
      {
        title: "Games",
        icon: "games",
        path: `/games/roullette_history`,
        activeTitle: "games",
        type: "sub",
        bookmark: true,
        active: false,
        children: [
          { path: `/games/roullette_history`, activeTitle: "roullette_history", type: "link", title: "Roullette History", },
          { path: `/games/ludu_history`, activeTitle: "ludu_history", type: "link", title: "Ludu History" },
          { path: `/games/janta_voldy`, activeTitle: "janta_voldy", type: "link", title: "Janta Voldy History" },
          { path: `/games/teen_patti`, activeTitle: "teen_patti", type: "link", title: "Teen Patti History" },
          { path: `/games/rummy`, activeTitle: "rummy", type: "link", title: "Rummy Game History" },
        ],
      },
    ],
  },

  // {
  //   menutitle: "Applications",
  //   menucontent: "Ready to use Apps",
  //   Items: [
  // {
  //   title: "Users",
  //   icon: "user",
  //   path: `/app/users/profile`,
  //   activeTitle:"Dashboard", type: "sub",
  //   bookmark: true,
  //   active: false,
  //   children: [
  //     { path: `/app/users/profile`, activeTitle:"Dashboard", type: "link", title: "User Profile" },
  //     { path: `/app/users/edit`, activeTitle:"Dashboard", type: "link", title: "User Edit" },
  //     { path: `/app/users/cards`, activeTitle:"Dashboard", type: "link", title: "User Cards" },
  //   ],
  // },
  // { path: `/user_list`, icon: "user", title: "User", activeTitle:"user_list", type: "link" },
  // { path: `/agent`, icon: "staff", title: "Agent", activeTitle:"agent", type: "link" },
  //   ],
  // },

  {
    menutitle: "Miscellaneous",
    menucontent: "Bouns Pages & Apps",
    Items: [
      { path: `/banner`, icon: "banner", activeTitle: "banner", type: "link", title: "Banner" },
      { path: `/notice`, icon: "faqs", activeTitle: "notice", type: "link", title: "Notice" },
      { path: `/push_notification`, icon: "notifications", activeTitle: "push_notification", type: "link", title: "Notification" },
      { path: `/settings`, icon: "setting", activeTitle: "settings", type: "link", title: "Settings" },
    ],
  },
];

export const MENUITEMSADMIN = [
  {
    menutitle: "Dashboard",
    menucontent: "Dashboards",
    Items: [
      { path: `/dashboard`, icon: "home", title: "Dashboard", activeTitle: "Dashboard", type: "link" },

    ],
  },
  {
    menutitle: "General",
    menucontent: "Dashboards,Widgets",
    Items: [
      // { path: `/admin_list`, icon: "staff", title: "Admin", activeTitle: "admin_list",  type: "link" },
      { path: `/agent`, icon: "staff", title: "Agent", activeTitle: "agent", type: "link" },
      { path: `/user_list`, icon: "user", title: "User", activeTitle: "user_list", type: "link" },
      // { path: `blogs`, icon: "location", title: "Blogs", activeTitle:"blogs", type: "link" },
      // { path: `/degree`, icon: "degree", title: "Degree", activeTitle:"Dashboard", type: "link" },
      // { path: `/diseases`, icon: "diseases", title: "Diseases", activeTitle:"Dashboard", type: "link" },
      // { path: `/specialization`, icon: "specialization", title: "Specialization", activeTitle:"Dashboard", type: "link" },
      // { path: `/pages`, icon: "form", title: "Pages", activeTitle:"pages", type: "link" },
      // { path: `/languages`, icon: "language", title: "Languages", activeTitle:"Dashboard", type: "link" },
    ],
  },

  // {
  //   menutitle: "Applications",
  //   menucontent: "Ready to use Apps",
  //   Items: [
  // {
  //   title: "Users",
  //   icon: "user",
  //   path: `/app/users/profile`,
  //   activeTitle:"Dashboard", type: "sub",
  //   bookmark: true,
  //   active: false,
  //   children: [
  //     { path: `/app/users/profile`, activeTitle:"Dashboard", type: "link", title: "User Profile" },
  //     { path: `/app/users/edit`, activeTitle:"Dashboard", type: "link", title: "User Edit" },
  //     { path: `/app/users/cards`, activeTitle:"Dashboard", type: "link", title: "User Cards" },
  //   ],
  // },
  // { path: `/user_list`, icon: "user", title: "User", activeTitle:"user_list", type: "link" },
  // { path: `/agent`, icon: "staff", title: "Agent", activeTitle:"agent", type: "link" },
  //   ],
  // },

  // {
  //   menutitle: "Miscellaneous",
  //   menucontent: "Bouns Pages & Apps",
  //   Items: [
  //     { path: `/banner`, icon: "banner", activeTitle: "banner",  type: "link", active: false, title: "Banner" },
  //     // { path: `/slider`, icon: "slider", activeTitle:"slider", type: "link", active: false, title: "Slider" },
  //     // { path: `/faqs`, icon: "faqs", activeTitle:"faqs", type: "link", active: false, title: "FAQ" },
  //     { path: `/settings`, icon: "setting", activeTitle: "settings",  type: "link", active: false, title: "Settings" },
  //   ],
  // },
];

export const MENUITEMSAGENT = [
  {
    menutitle: "Dashboard",
    menucontent: "Dashboards",
    Items: [
      { path: `/dashboard`, icon: "home", title: "Dashboard", activeTitle: "Dashboard", type: "link" },

    ],
  },
  {
    menutitle: "General",
    menucontent: "Dashboards,Widgets",
    Items: [
      // { path: `/admin_list`, icon: "staff", title: "Admin", activeTitle: "admin_list",  type: "link" },
      // { path: `/agent`, icon: "staff", title: "Agent", activeTitle: "agent",  type: "link" },
      { path: `/user_list`, icon: "user", title: "User", activeTitle: "user_list", type: "link" },
      // { path: `blogs`, icon: "location", title: "Blogs", activeTitle:"blogs", type: "link" },
      // { path: `/degree`, icon: "degree", title: "Degree", activeTitle:"Dashboard", type: "link" },
      // { path: `/diseases`, icon: "diseases", title: "Diseases", activeTitle:"Dashboard", type: "link" },
      // { path: `/specialization`, icon: "specialization", title: "Specialization", activeTitle:"Dashboard", type: "link" },
      // { path: `/pages`, icon: "form", title: "Pages", activeTitle:"pages", type: "link" },
      // { path: `/languages`, icon: "language", title: "Languages", activeTitle:"Dashboard", type: "link" },
    ],
  },

  // {
  // menutitle: "Applications",
  // menucontent: "Ready to use Apps",
  // Items: [
  // {
  //   title: "Users",
  //   icon: "user",
  //   path: `/app/users/profile`,
  //   activeTitle:"Dashboard", type: "sub",
  //   bookmark: true,
  //   active: false,
  //   children: [
  //     { path: `/app/users/profile`, activeTitle:"Dashboard", type: "link", title: "User Profile" },
  //     { path: `/app/users/edit`, activeTitle:"Dashboard", type: "link", title: "User Edit" },
  //     { path: `/app/users/cards`, activeTitle:"Dashboard", type: "link", title: "User Cards" },
  //   ],
  // },
  // { path: `/user_list`, icon: "user", title: "User", activeTitle:"user_list", type: "link" },
  // { path: `/agent`, icon: "staff", title: "Agent", activeTitle:"agent", type: "link" },
  // ],
  // },

  // {
  //   menutitle: "Miscellaneous",
  //   menucontent: "Bouns Pages & Apps",
  //   Items: [
  //     { path: `/banner`, icon: "banner", activeTitle: "banner",  type: "link", active: false, title: "Banner" },
  //     // { path: `/slider`, icon: "slider", activeTitle:"slider", type: "link", active: false, title: "Slider" },
  //     // { path: `/faqs`, icon: "faqs", activeTitle:"faqs", type: "link", active: false, title: "FAQ" },
  //     { path: `/settings`, icon: "setting", activeTitle: "settings",  type: "link", active: false, title: "Settings" },
  //   ],
  // },
];