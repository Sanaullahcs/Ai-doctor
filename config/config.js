export const environment = "deployment";

export let url = "";

if (environment === "development") {
  // url = DEVELOPMENT_URL;
  url = "http://192.168.0.46:4000";
} else {
  // url = PRODUCTION_URL;
  url = "https://aititle.tabsgi.com:4000";
}
