/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/sessions/route";
exports.ids = ["app/api/sessions/route"];
exports.modules = {

/***/ "(rsc)/./app/api/sessions/route.ts":
/*!***********************************!*\
  !*** ./app/api/sessions/route.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.93.0/node_modules/next/dist/api/server.js\");\n\nasync function GET(request) {\n    try {\n        const { searchParams } = new URL(request.url);\n        const email = searchParams.get(\"email\");\n        const dbNameParam = searchParams.get(\"dbName\");\n        if (!email) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"Missing email\"\n            }, {\n                status: 400\n            });\n        }\n        const dbName = dbNameParam || process.env.NEXT_PUBLIC_DB_NAME || \"tx_esc_04\";\n        const encodedEmail = encodeURIComponent(email);\n        const upstreamUrl = `https://dev.escworks.com/api/session/user/${encodedEmail}/today?dbName=${encodeURIComponent(dbName)}`;\n        const res = await fetch(upstreamUrl, {\n            // Do not cache - always fetch latest\n            cache: \"no-store\"\n        });\n        if (!res.ok) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"Upstream error\",\n                status: res.status\n            }, {\n                status: res.status\n            });\n        }\n        const data = await res.json();\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(data, {\n            status: 200\n        });\n    } catch (error) {\n        console.error(\"/api/sessions error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Server error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3Nlc3Npb25zL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQTBDO0FBRW5DLGVBQWVDLElBQUlDLE9BQWdCO0lBQ3hDLElBQUk7UUFDRixNQUFNLEVBQUVDLFlBQVksRUFBRSxHQUFHLElBQUlDLElBQUlGLFFBQVFHLEdBQUc7UUFDNUMsTUFBTUMsUUFBUUgsYUFBYUksR0FBRyxDQUFDO1FBQy9CLE1BQU1DLGNBQWNMLGFBQWFJLEdBQUcsQ0FBQztRQUVyQyxJQUFJLENBQUNELE9BQU87WUFDVixPQUFPTixxREFBWUEsQ0FBQ1MsSUFBSSxDQUFDO2dCQUFFQyxTQUFTO1lBQWdCLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUN2RTtRQUVBLE1BQU1DLFNBQVNKLGVBQWVLLFFBQVFDLEdBQUcsQ0FBQ0MsbUJBQW1CLElBQUk7UUFDakUsTUFBTUMsZUFBZUMsbUJBQW1CWDtRQUV4QyxNQUFNWSxjQUFjLENBQUMsMENBQTBDLEVBQUVGLGFBQWEsY0FBYyxFQUFFQyxtQkFBbUJMLFNBQVM7UUFFMUgsTUFBTU8sTUFBTSxNQUFNQyxNQUFNRixhQUFhO1lBQ25DLHFDQUFxQztZQUNyQ0csT0FBTztRQUdUO1FBRUEsSUFBSSxDQUFDRixJQUFJRyxFQUFFLEVBQUU7WUFDWCxPQUFPdEIscURBQVlBLENBQUNTLElBQUksQ0FDdEI7Z0JBQUVDLFNBQVM7Z0JBQWtCQyxRQUFRUSxJQUFJUixNQUFNO1lBQUMsR0FDaEQ7Z0JBQUVBLFFBQVFRLElBQUlSLE1BQU07WUFBQztRQUV6QjtRQUVBLE1BQU1ZLE9BQU8sTUFBTUosSUFBSVYsSUFBSTtRQUMzQixPQUFPVCxxREFBWUEsQ0FBQ1MsSUFBSSxDQUFDYyxNQUFNO1lBQUVaLFFBQVE7UUFBSTtJQUMvQyxFQUFFLE9BQU9hLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLHdCQUF3QkE7UUFDdEMsT0FBT3hCLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7WUFBRUMsU0FBUztRQUFlLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ3RFO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcZXRoYW5cXE9uZURyaXZlXFxEZXNrdG9wXFxOZXcgU3R1ZmZcXEtpb3NrLXYyXFxxclxcYXBwXFxhcGlcXHNlc3Npb25zXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIlxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXF1ZXN0OiBSZXF1ZXN0KSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHsgc2VhcmNoUGFyYW1zIH0gPSBuZXcgVVJMKHJlcXVlc3QudXJsKVxyXG4gICAgY29uc3QgZW1haWwgPSBzZWFyY2hQYXJhbXMuZ2V0KFwiZW1haWxcIilcclxuICAgIGNvbnN0IGRiTmFtZVBhcmFtID0gc2VhcmNoUGFyYW1zLmdldChcImRiTmFtZVwiKVxyXG5cclxuICAgIGlmICghZW1haWwpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgbWVzc2FnZTogXCJNaXNzaW5nIGVtYWlsXCIgfSwgeyBzdGF0dXM6IDQwMCB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRiTmFtZSA9IGRiTmFtZVBhcmFtIHx8IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0RCX05BTUUgfHwgXCJ0eF9lc2NfMDRcIlxyXG4gICAgY29uc3QgZW5jb2RlZEVtYWlsID0gZW5jb2RlVVJJQ29tcG9uZW50KGVtYWlsKVxyXG5cclxuICAgIGNvbnN0IHVwc3RyZWFtVXJsID0gYGh0dHBzOi8vZGV2LmVzY3dvcmtzLmNvbS9hcGkvc2Vzc2lvbi91c2VyLyR7ZW5jb2RlZEVtYWlsfS90b2RheT9kYk5hbWU9JHtlbmNvZGVVUklDb21wb25lbnQoZGJOYW1lKX1gXHJcblxyXG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXBzdHJlYW1VcmwsIHtcclxuICAgICAgLy8gRG8gbm90IGNhY2hlIC0gYWx3YXlzIGZldGNoIGxhdGVzdFxyXG4gICAgICBjYWNoZTogXCJuby1zdG9yZVwiLFxyXG4gICAgICAvLyBJZiB0aGUgdXBzdHJlYW0gbmVlZHMgaGVhZGVycyBsaWtlIEFQSSBrZXlzLCBhZGQgdGhlbSBoZXJlXHJcbiAgICAgIC8vIGhlYWRlcnM6IHsgLi4uIH1cclxuICAgIH0pXHJcblxyXG4gICAgaWYgKCFyZXMub2spIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgbWVzc2FnZTogXCJVcHN0cmVhbSBlcnJvclwiLCBzdGF0dXM6IHJlcy5zdGF0dXMgfSxcclxuICAgICAgICB7IHN0YXR1czogcmVzLnN0YXR1cyB9LFxyXG4gICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKClcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihkYXRhLCB7IHN0YXR1czogMjAwIH0pXHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCIvYXBpL3Nlc3Npb25zIGVycm9yOlwiLCBlcnJvcilcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IG1lc3NhZ2U6IFwiU2VydmVyIGVycm9yXCIgfSwgeyBzdGF0dXM6IDUwMCB9KVxyXG4gIH1cclxufVxyXG5cclxuXHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJHRVQiLCJyZXF1ZXN0Iiwic2VhcmNoUGFyYW1zIiwiVVJMIiwidXJsIiwiZW1haWwiLCJnZXQiLCJkYk5hbWVQYXJhbSIsImpzb24iLCJtZXNzYWdlIiwic3RhdHVzIiwiZGJOYW1lIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0RCX05BTUUiLCJlbmNvZGVkRW1haWwiLCJlbmNvZGVVUklDb21wb25lbnQiLCJ1cHN0cmVhbVVybCIsInJlcyIsImZldGNoIiwiY2FjaGUiLCJvayIsImRhdGEiLCJlcnJvciIsImNvbnNvbGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/sessions/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.93.0/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsessions%2Froute&page=%2Fapi%2Fsessions%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsessions%2Froute.ts&appDir=C%3A%5CUsers%5Cethan%5COneDrive%5CDesktop%5CNew%20Stuff%5CKiosk-v2%5Cqr%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cethan%5COneDrive%5CDesktop%5CNew%20Stuff%5CKiosk-v2%5Cqr&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.4_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.93.0/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsessions%2Froute&page=%2Fapi%2Fsessions%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsessions%2Froute.ts&appDir=C%3A%5CUsers%5Cethan%5COneDrive%5CDesktop%5CNew%20Stuff%5CKiosk-v2%5Cqr%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cethan%5COneDrive%5CDesktop%5CNew%20Stuff%5CKiosk-v2%5Cqr&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.93.0/node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.93.0/node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.93.0/node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_ethan_OneDrive_Desktop_New_Stuff_Kiosk_v2_qr_app_api_sessions_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/sessions/route.ts */ \"(rsc)/./app/api/sessions/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/sessions/route\",\n        pathname: \"/api/sessions\",\n        filename: \"route\",\n        bundlePath: \"app/api/sessions/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\ethan\\\\OneDrive\\\\Desktop\\\\New Stuff\\\\Kiosk-v2\\\\qr\\\\app\\\\api\\\\sessions\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_ethan_OneDrive_Desktop_New_Stuff_Kiosk_v2_qr_app_api_sessions_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vbmV4dEAxNS4yLjRfcmVhY3QtZG9tQDE5LjAuMF9yZWFjdEAxOS4wLjBfX3JlYWN0QDE5LjAuMF9zYXNzQDEuOTMuMC9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZzZXNzaW9ucyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGc2Vzc2lvbnMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZzZXNzaW9ucyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNldGhhbiU1Q09uZURyaXZlJTVDRGVza3RvcCU1Q05ldyUyMFN0dWZmJTVDS2lvc2stdjIlNUNxciU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDZXRoYW4lNUNPbmVEcml2ZSU1Q0Rlc2t0b3AlNUNOZXclMjBTdHVmZiU1Q0tpb3NrLXYyJTVDcXImaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQzBDO0FBQ3ZIO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxldGhhblxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXE5ldyBTdHVmZlxcXFxLaW9zay12MlxcXFxxclxcXFxhcHBcXFxcYXBpXFxcXHNlc3Npb25zXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9zZXNzaW9ucy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3Nlc3Npb25zXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9zZXNzaW9ucy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXGV0aGFuXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcTmV3IFN0dWZmXFxcXEtpb3NrLXYyXFxcXHFyXFxcXGFwcFxcXFxhcGlcXFxcc2Vzc2lvbnNcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.93.0/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsessions%2Froute&page=%2Fapi%2Fsessions%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsessions%2Froute.ts&appDir=C%3A%5CUsers%5Cethan%5COneDrive%5CDesktop%5CNew%20Stuff%5CKiosk-v2%5Cqr%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cethan%5COneDrive%5CDesktop%5CNew%20Stuff%5CKiosk-v2%5Cqr&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.93.0/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.4_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.93.0/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \*********************************************************************************************************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/.pnpm/next@15.2.4_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.93.0/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.4_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.93.0/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \*********************************************************************************************************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next@15.2.4_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.93.0"], () => (__webpack_exec__("(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.93.0/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsessions%2Froute&page=%2Fapi%2Fsessions%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsessions%2Froute.ts&appDir=C%3A%5CUsers%5Cethan%5COneDrive%5CDesktop%5CNew%20Stuff%5CKiosk-v2%5Cqr%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cethan%5COneDrive%5CDesktop%5CNew%20Stuff%5CKiosk-v2%5Cqr&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();