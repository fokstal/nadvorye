import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "/nadvorye/",
    resolve: {
        alias: {
            "@root": resolve(__dirname, "./"),
            "@public": resolve(__dirname, "./public"),
            "@src": resolve(__dirname, "./src"),
            "@assets": resolve(__dirname, "./src/assets"),
            "@components": resolve(__dirname, "./src/components"),
            "@const": resolve(__dirname, "./src/const"),
            "@helpers": resolve(__dirname, "./src/helpers"),
            "@models": resolve(__dirname, "./src/models"),
            "@service": resolve(__dirname, "./src/service"),
            "@styles": resolve(__dirname, "./src/styles"),
        },
    },
});
