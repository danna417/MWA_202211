// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  base_url: "http://localhost:3001/api/",
  manga_service_url: "manga/",
  author_service_url: "/author/",
  user_service_url: "user",
  login_service_url: "/login",
  register_service_url: "/register",
  nav_home: "",
  nav_mangas: "mangas",
  nav_mangas_add: "mangas/add",
  nav_author: "/author/",
  nav_manga: "manga/",
  nav_register: "register",
  param_mangaId: "mangaId",
  param_authorId: "authorId",
  token_bearer: "Bearer ",
  header_authorization: "authorization ",
  token: "token",
  text_welcome: "Welcome to MEAN Manga",
  text_welcome_Additional: "You can find interesting Manga List here",
  text_page_not_found: "Your Requested Page Is Not Found",
  text_home: "Home",
  text_mangas: "mangas",
  text_register: "Register",
  text_login: "Login",
  text_logout: "Logout",
  text_login_failed: "Username or password is wrong",
  text_username: "Username",
  text_password: "Password",
  text_name: "Name",
  text_title_eng: "English Title",
  text_title_jpn: "Japanese TItle",
  text_published: "Published",
  text_status: "Status",
  text_genre: "Genre",
  text_role: "Role",
  text_authors: "Auhtors",
  text_edit: "Edit",
  text_update: "Update",
  text_cancel: "Cancel",
  text_add: "Add",
  text_add_author: "Add Author",
  text_delete_manga: "Delete Manga",
  text_search_title: "Search By Title",
  text_next: "Next",
  text_prev: "Prev",
  default_page: 1,
  default_page_count: 5,
  default_page_offset: 0,
  query_offset: "offset=",
  query_count: "count=",
  query_title: "title=",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.