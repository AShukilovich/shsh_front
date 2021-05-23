<template>
  <v-container>
    <h1 class="text-h5">Сканирование заказа</h1>
    <video ref="video" class="video"></video>
    <canvas ref="canvas" class="canvas"></canvas>

    <div v-if="order.id" class="order-info">
      <div class="cart-list">
        <CartItem v-for="(item, key) in order.products" :key="key" :item="item" :not-delete="true" />
      </div>
      <v-btn color="indigo" class="rent-btn mt-4" dark>Оборудование выдано</v-btn>
    </div>

    <v-btn v-if="!scanHidden" color="indigo" dark class="scan-btn mt-4" @click="scan">Сканировать QR-код</v-btn>
  </v-container>
</template>

<script>
import jsQR from "jsqr";
import CartItem from "@/components/CartItem";
import {mapActions, mapState} from "vuex";

export default {
  name: "QrcodeScan",
  components: {CartItem},
  data() {
    return {
      scanHidden: false,
      animationFrame: null,
    };
  },
  computed: {
    ...mapState({
      order: (state) => state.order.order,
    }),
    canvas() {
      return this.$refs.canvas.getContext("2d");
    }
  },
  methods: {
    ...mapActions(['GET_ORDER']),
    drawLine(begin, end, color) {
      this.canvas.beginPath();
      this.canvas.moveTo(begin.x, begin.y);
      this.canvas.lineTo(end.x, end.y);
      this.canvas.lineWidth = 10;
      this.canvas.strokeStyle = color;
      this.canvas.stroke();
    },
    start() {
      if (this.$refs.video.readyState === this.$refs.video.HAVE_ENOUGH_DATA) {
        this.$refs.canvas.hidden = false;

        this.$refs.canvas.height = this.$refs.video.videoHeight;
        this.$refs.canvas.width = this.$refs.video.videoWidth;
        this.canvas.drawImage(this.$refs.video, 0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
        const imageData = this.canvas.getImageData(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });

        if (code) {
          this.drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#3F51B5");
          this.drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#3F51B5");
          this.drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#3F51B5");
          this.drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#3F51B5");

          this.stop();

          this.GET_ORDER(code.data);
        }
      }
      this.animationFrame = requestAnimationFrame(this.start);
    },
    stop() {
      this.$refs.video.pause();
      this.$refs.video.remove();
      this.$refs.canvas.remove();
      this.scanHidden = true;
      cancelAnimationFrame(this.animationFrame);
    },
    scan() {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then((stream) => {
        this.$refs.video.srcObject = stream;
        this.$refs.video.setAttribute("playsinline", true);
        this.$refs.video.play();
        this.animationFrame = requestAnimationFrame(this.start);
      });
    },
  },
}
</script>

<style scoped>
.video {
  display: none;
}
.canvas {
  width: calc(100vw - 24px);
}
.scan-btn {
  width: calc(100vw - 24px);
}
.rent-btn {
  width: calc(100vw - 24px);
}
</style>