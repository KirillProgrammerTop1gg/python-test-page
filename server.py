from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse
import os

PORT = 8000

class RouterHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path: str) -> str:
        return super().translate_path(path)

    def do_GET(self):
        parsed = urlparse(self.path)
        route = parsed.path

        if route == "/":
            self.path = "/index.html"
            return super().do_GET()

        if route == "/search":
            self.path = "/search.html"
            return super().do_GET()

        if route == "/add-song":
            self.path = "/add-song.html"
            return super().do_GET()

        if route.startswith("/static/"):
            return super().do_GET()

        self.send_response(404)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.end_headers()

        error_path = os.path.join(os.getcwd(), "error.html")
        with open(error_path, "rb") as f:
            self.wfile.write(f.read())

def run():
    server_address = ("", PORT)
    httpd = HTTPServer(server_address, RouterHandler)
    print(f"Server running on http://localhost:{PORT}")
    httpd.serve_forever()

if __name__ == "__main__":
    run()