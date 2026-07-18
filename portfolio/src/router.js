import { createRouter, createWebHistory } from "vue-router";

import HomeScreen from "./views/Home.vue";
import AboutScreen from "./views/About.vue";
import WorkScreen from "./views/Gallery.vue";
import ProfilesScreen from "./views/Profiles.vue";
import ContactScreen from "./views/Contact.vue";
import CV from "./components/Cv.vue";

// Note: the app renders no <router-view> — the site is a one-pager and the
// routes only exist to give the sections stable URLs (history entries).
const routes = [
  { path: "/demo", component: { render: () => null } },
  {
    path: "/",
    name: "home",
    component: HomeScreen
  },
  {
    path: "/about",
    name: "about",
    component: AboutScreen
  },
  {
    path: "/gallery",
    name: "gallery",
    component: WorkScreen
  },
  {
    path: "/profiles",
    name: "profiles",
    component: ProfilesScreen
  },
  {
    path: "/contact",
    name: "contact",
    component: ContactScreen
  },
  {
    path: "/curriculum-vitae",
    name: "cv",
    component: CV
  }
];

// Same effective behavior as before: restore position on back/forward,
// otherwise keep the current scroll position (nav scrolling is handled
// by MainNav itself).
const scrollBehavior = function (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition;
  }
  return false;
};

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  scrollBehavior
});
