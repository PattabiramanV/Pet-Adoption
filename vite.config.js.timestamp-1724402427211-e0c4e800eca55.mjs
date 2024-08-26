// vite.config.js
import { defineConfig } from "file:///var/www/html/petadoption/node_modules/vite/dist/node/index.js";
import react from "file:///var/www/html/petadoption/node_modules/@vitejs/plugin-react-swc/index.mjs";
var vite_config_default = defineConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  optimizeDeps: {
    exclude: [
      "chunk-HKARQHL6.js",
      "chunk-IE4XGEBL.js"
    ]
  },
  theme: {
    extend: {}
  },
  plugins: [react()],
  server: {
    port: 3e3
    // Set your desired port number here
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvdmFyL3d3dy9odG1sL3BldGFkb3B0aW9uXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvdmFyL3d3dy9odG1sL3BldGFkb3B0aW9uL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy92YXIvd3d3L2h0bWwvcGV0YWRvcHRpb24vdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3Yydcbi8qKiBAdHlwZSB7aW1wb3J0KCd0YWlsd2luZGNzcycpLkNvbmZpZ30gKi9cblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgY29udGVudDogW1xuICAgIFwiLi9pbmRleC5odG1sXCIsXG4gICAgXCIuL3NyYy8qKi8qLntqcyx0cyxqc3gsdHN4fVwiLFxuICBdLFxuICAgIG9wdGltaXplRGVwczoge1xuICAgIGV4Y2x1ZGU6IFtcbiAgICAgICdjaHVuay1IS0FSUUhMNi5qcycsXG4gICAgICAnY2h1bmstSUU0WEdFQkwuanMnXG4gICAgXVxuICB9LFxuICB0aGVtZToge1xuICAgIGV4dGVuZDoge30sXG4gIH0sXG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogMzAwMCwgLy8gU2V0IHlvdXIgZGVzaXJlZCBwb3J0IG51bWJlciBoZXJlXG4gIH0sXG59KVxuXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZQLFNBQVMsb0JBQW9CO0FBQzFSLE9BQU8sV0FBVztBQUlsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDVDtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQUEsRUFDRSxjQUFjO0FBQUEsSUFDZCxTQUFTO0FBQUEsTUFDUDtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUSxDQUFDO0FBQUEsRUFDWDtBQUFBLEVBQ0EsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQTtBQUFBLEVBQ1I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
