(function (w) {
    var is = function (e) {
        this.container = Object();
        this.is_data = document.getElementById(e);
    };
    is.prototype = {
            Model:function (m, s) {
                var model=document.createElement(m);
                this.style(s,model);
                return model
            },
            style: function (s, d) {
                var arrkey = [], arrname = [], reg = /[A-Z]/;
                for (var x in s) {
                    arrkey.push(s[x]);
                    arrname.push(x);
                }
                for (var i = 0; i < arrname.length; i++) {
                    for (var j = 0; j < arrname[i].length; j++) {
                        if (reg.test(arrname[i][j])) {
                            arrname[i] = arrname[i].replace(arrname[i][j], "-" + arrname[i][j].toLowerCase());
                        }
                    }
                }
                for (var k = 0; k < arrname.length; k++) {
                    d.style.cssText += arrname[k] + ":" + arrkey[k];
                }
            },
            circular: function (w,s,c) {
                var _this=this;
                _this.container.circular=Object();
                _this.container.circular.maxdiv=_this.Model("div",{
                    width:w+"px",
                    height:w+"px"
                });
                _this.container.circular.canvas=_this.Model("canvas",{});
                _this.container.circular.canvas.width=w;
                _this.container.circular.canvas.height=w;
                _this.container.circular.maxdiv.appendChild(_this.container.circular.canvas);
                _this.is_data.appendChild(_this.container.circular.maxdiv);
                _this.container.circular.radata=_this.canvasAnimate(_this.container.circular.canvas,w,s,c);
                return {
                    size:_this.container.circular.radata.rafun
                };
            },
            canvasAnimate:function (el,wit,siz,col) {
                function Circle() {
                    this.radius = (wit-(siz*2))/2;
                    this.lineWidth = siz;
                    this.strokeStyle = col.edgeColor;
                    this.fillStyle = col.lineColor;
                    this.insideStyle = col.bgColor;
                    this.lineCap = 'round';
                }
                Circle.prototype.draw = function(ctx) {
                    ctx.beginPath();
                    ctx.arc(wit/2, wit/2, this.radius, 0, Math.PI*2, true);
                    ctx.lineWidth = this.lineWidth;
                    ctx.strokeStyle = this.strokeStyle;
                    ctx.fillStyle = this.insideStyle;
                    ctx.fill();
                    ctx.stroke();
                };
                function Ring(startAngle, percent) {
                    Circle.call(this);
                    this.startAngle = startAngle || 3*Math.PI/2;
                    this.percent = percent;
                }
                Ring.prototype = Object.create(Circle.prototype);
                Ring.prototype.drawRing = function(ctx) {
                    this.draw(ctx);
                    ctx.beginPath();
                    var anglePerSec = 2 * Math.PI / (100 / this.percent);
                    ctx.arc(wit/2, wit/2, this.radius, this.startAngle, this.startAngle +anglePerSec, false);
                    ctx.strokeStyle = this.fillStyle;
                    ctx.lineCap = this.lineCap;
                    ctx.stroke();
                    ctx.closePath();
                };
                var ctx = el.getContext("2d");
                var ring = new Ring(0, 0);
                    ring.percent=0;
                    ring.drawRing(ctx);
                return {
                    rafun: function (i) {
                        ring.percent=i;
                        ring.drawRing(ctx);
                    }
                }
            }
    };
    return w.$S = function (e) {
        return new is(e);
    }
})(window);
