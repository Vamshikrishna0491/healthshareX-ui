import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');

    function Pixel(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.hue = Math.floor(Math.random() * 227);
      var direction = Math.random() > 0.5 ? -1 : 1;
      this.velocity = (Math.random() * 30 + 10) * 0.02 * direction;
    }

    Pixel.prototype.update = function () {
      this.hue += this.velocity;
    };

    Pixel.prototype.render = function (ctx) {

      var hue = Math.round(this.hue);
      ctx.fillStyle = 'hsl('+ hue +',100%,50%)';
      ctx.fillRect(this.x, this.y, this.z, 1, 1, 1);
    };



    var pixels = [
      new Pixel(0, 0, 0),
      new Pixel(1, 1, 1),
      new Pixel(2, 2, 2),
      new Pixel(0, 1, 1),
      new Pixel(0, 0, 1),
      new Pixel(1, 2, 2),
    ];

    function animate() {
      pixels.forEach(function (pixel) {
        pixel.update();
        pixel.render(ctx);
      });
      requestAnimationFrame(animate);
    }

    animate();

  }

}
