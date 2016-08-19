# -*- coding: utf-8 -*-

import os
import os.path
import tornado.ioloop
import tornado.web
import tornado.websocket
import tornado.httpserver
from tornado.escape import json_decode, json_encode
import threading


class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
            (r"/", HomeHandler),
            (r"/websocket", WebSocket)
        ]
        settings = dict(
            template_path=os.path.join(os.path.dirname(__file__), "../www"),
            static_path=os.path.join(os.path.dirname(__file__), "../www"),
            debug=True,
        )
        super(Application, self).__init__(handlers, **settings)


class BaseHandler(tornado.web.RequestHandler):
    def prepare(self):
        if "Content-Type" not in self.request.headers:
            return
        content_type = self.request.headers["Content-Type"].strip()
        if not content_type:
            return

        if content_type.startswith("application/json"):
            self.json_args = json_decode(self.request.body)
        else:
            self.json_args = None

    def response_error(self, err):
        self.write(json_encode({"error": err}))

    def response(self, res_dict):
        self.write(json_encode(res_dict))


class HomeHandler(BaseHandler):
    def get(self):
        self.render("index.html")

class WebSocket(tornado.websocket.WebSocketHandler):
    def open(self):
        print("WebSocket opened")

    def on_message(self, message):
        print 'on_message:', message
        self.write_message('232323')


def on_close(self):
    print("WebSocket closed")


def main():
    http_server = tornado.httpserver.HTTPServer(Application())
    http_server.listen("9999")
    tornado.ioloop.IOLoop.current().start()


if __name__ == "__main__":
    main()
