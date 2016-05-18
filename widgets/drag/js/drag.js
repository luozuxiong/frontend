/**
 * Created by hz16032113 on 2016/4/5.
 */
var Drag = (function () {

    var Drag = function (options) {
        if (!(this instanceof Drag)) {
            return new Drag(options);
        }
        this.init(options);
        return this;
    }


    var proto = Drag.prototype;

    proto.defaults = {
        cursor: "move"
    }
    proto.pos = {
        x: 0,
        y: 0
    }

    proto.init = function (options) {
        if (!options.id) {
            throw new Error("拖拽元素id不能为空!");
        }
        this.opts = _extend(this.defaults, options);
        this.element = document.getElementById(options.id);
        if (this.element === null) {
            throw new Error("拖拽元素不存在!");
        }

        this.initEvent();
    }

    proto.initEvent = function () {
        var self = this;
        this.element.onmousedown = function(e){
            proto.events.mousedown.call(self,e)
        };
    }
    proto.events = {
        mousedown: function (e) {
            var
                self = this;
                el = this.element;
            proto.pos = {
                x: e ? e.clientX : window.event.clientX,
                y: e ? e.clientY : window.event.clientY
            }
            el.style.cssText += ";cursor:" + this.opts.cursor + ";" +
                "position:fixed;top:" + el.offsetTop + "px;" +
                "left:" + el.offsetLeft + "px;";
            el.onmousemove = function(e){
                proto.events.mousemove.call(self,e)
            };
        },
        mousemove: function (e) {
            var
                self = this,
                el = this.element;
            curPos = {
                x: e ? e.clientX : window.event.clientX,
                y: e ? e.clientY : window.event.clientY
            };
            el.style.cssText += "cursor:" + this.opts.cursor + ";" +
                "left:" + (parseInt(el.style.left) + (curPos.x - this.pos.x)) + "px;" +
                "top:" + (parseInt(el.style.top) + (curPos.y - this.pos.y)) + "px;";
            this.pos = curPos;
            el.onmouseup = function (e){
                proto.events.mouseup.call(self,e)
            };
        },
        mouseup: function () {
            var el = this.element;
            el.style.cssText += "cursor:default";
            el.onmousemove = null;
        }
    }

    function _extend(o1, o2) {
        for (i in o2) {
            if (o2.hasOwnProperty(i)) {
                o1[i] = o2[i];
            }
        }
        return o1;
    }
    return Drag;
}());