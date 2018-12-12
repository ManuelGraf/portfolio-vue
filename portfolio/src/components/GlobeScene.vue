<template>
  <div>
    <!-- Author: Manuel Graf -->
    <div class="globe-markers" v-show="globeCtrl.isVisible">
      <div
        class="globe-marker__wrapper"
        ng-repeat="location in globeCtrl.markers.children track by $index"
        :class="{'is-active': (globeCtrl.activeMarker == location.userData.id)}"
      >
        <div
          :id="location.userData.id"
          class="globe-marker icon-basic-location-pin-2"
          :class="{
						'is-occluded': (globeCtrl.isLocationOccluded(location)), 
						'is-active': (globeCtrl.activeMarker == location.userData.id),
						'is-cluster': (location.userData.locations.length > 1), 
						'is-highlighted':globeCtrl.isMarkerHighlighted(location)
					}"
          @click="globeCtrl.onMarkerClick($event,location)"
          :style="globeCtrl.getMarkerLabelScreenPos(location)"
        >
          <span
            class="globe-marker__count"
            v-if="location.userData.locations.length > 1 && !globeCtrl.highlightedPlants.length"
          >{{location.userData.locations.length}}</span>
          <span
            class="globe-marker__count"
            v-if="globeCtrl.highlightedPlants.length && location.userData.matchCount"
          >{{location.userData.matchCount}}</span>
          <div
            class="globe-marker__labels globe-marker__labels--desktop"
            v-if="!globeCtrl.isMobileView()"
            v-show="globeCtrl.activeMarker == location.userData.id"
          >
            <div class="globe-marker__labels__wrapper">
              <ul>
                <li
                  class="globe-marker__label globe-marker__label--desktop"
                  ng-repeat="location in location.userData.locations track by $index"
                  :class="{'is-no-match': !globeCtrl.isSubplantHighlighted(location) }"
                >
                  <a class="globe-marker__label__icon icon-da-03-location-marker-list"></a>
                  <div class="globe-marker__label__cta">
                    <div
                      class="button"
                      @click="globeCtrl.moveToIvLocation($event,location.sitemodelId,'panorama')"
                    >
                      <span class="button__icon icon-bp-02-view-panorama"></span>
                      <span class="button__text">Panorama</span>
                    </div>
                    <div
                      class="button"
                      @click="globeCtrl.moveToIvLocation($event,location.sitemodelId,'map')"
                    >
                      <span class="button__icon icon-bp-02-view-map"></span>
                      <span class="button__text">Karte</span>
                    </div>
                  </div>

                  <div class="globe-marker__label__info">
                    <p
                      class="globe-marker__label__subplant"
                      v-if="location.state.highlighted"
                      ng-bind-html="location.state.matchingTitle"
                    ></p>
                    <p
                      class="globe-marker__label__subplant"
                      v-if="!location.state.highlighted"
                    >{{location.label}}</p>
                  </div>
                  <a class="globe-marker__label__icon icon-bp-02-menu-enter"></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- only for mobile, because of position fixed... -->
        <div
          class="globe-marker__labels globe-marker__labels--mobile"
          v-if="globeCtrl.isMobileView()"
          v-show="globeCtrl.activeMarker == location.userData.id"
        >
          <div class="globe-marker__labels__wrapper">
            <ul>
              <li
                class="globe-marker__label globe-marker__label--mobile"
                v-for="(location,index) in location.userData.locations"
                :key="index"
                :class="{ 'is-selected': globeCtrl.selectedPlant === location.id, 'is-no-match': !globeCtrl.isSubplantHighlighted(location) }"
                @click="globeCtrl.onPlantSelected($event,location.id)"
              >
                <a class="globe-marker__label__icon icon-da-03-location-marker"></a>

                <div
                  class="globe-marker__label__cta"
                  v-show="globeCtrl.selectedPlant === location.id"
                >
                  <div
                    class="button"
                    @click="globeCtrl.moveToIvLocation($event,location.sitemodelId,'panorama')"
                  >
                    <span class="button__icon icon-bp-02-view-panorama"></span>
                    <span class="button__text">Panorama</span>
                  </div>
                  <div
                    class="button"
                    @click="globeCtrl.moveToIvLocation($event,location.sitemodelId,'map')"
                  >
                    <span class="button__icon icon-bp-02-view-map"></span>
                    <span class="button__text">Karte</span>
                  </div>
                </div>
                <div class="globe-marker__label__info">
                  <breadcrumb
                    class="globe-marker__label__breadcrumb"
                    show-sub-building="false"
                    building-id="location.id"
                    :class="{'is-inline': !crumbCtrl.showSubBuilding }"
                  ></breadcrumb>
                  <p
                    class="globe-marker__label__subplant"
                    v-if="location.state.highlighted"
                    ng-bind-html="location.state.matchingTitle"
                  ></p>
                  <p
                    class="globe-marker__label__subplant"
                    v-if="!location.state.highlighted"
                  >{{location.label}}</p>
                </div>
                <a class="globe-marker__label__icon icon-bp-02-menu-enter"></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import GlobeComponentController from "@/modules/GlobeController.js";
export default {
  mounted: function() {
    this.globeCtrl = new GlobeComponentController();
    console.log(globeCtrl);
    this.globeCtrl.init();
  },
  data: function() {
    return {
      globeCtrl: {}
    };
  }
};
</script>

<style lang="scss" scoped>
$icon-size: $min-tap/2;
$icon-size-big: $icon-size + $icon-size * $gs-b;
$marker-color: white;
$marker-color-active: #fff;
$marker-color-highlight: orange;
$z-globe: 30;
$z-globelabels: 31;

#globe-scene {
  display: block;
  overflow: hidden;
  position: absolute;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 100%;
  opacity: 1;
}

.globe {
  width: 100%;
}

.globe-marker {
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 1;
  text-shadow: -1px 1px 5px black;
  cursor: pointer;
  transform: translateX(-50%);

  &:before {
    // @extend %iconfont-da-03;
    // content: $icon-da-03-location-marker;
  }

  &.is-cluster:before {
    // content: $icon-da-03-location-marker;
    // font-size: 5rem;
  }

  &__count {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    top: 0;
    right: -3px;
    width: ceil($icon-size - ($icon-size * $gs-b));
    height: ceil($icon-size - ($icon-size * $gs-b));
    border-radius: 50%;
    color: white;
    background: $color-yellow;
    text-shadow: none;
    font-size: $icon-size - $icon-size * $gs-a;
    font-weight: bold;
    text-align: center;
  }

  &.is-occluded {
    opacity: 0.3;
  }

  &.is-highlighted::before,
  &.is-active.is-highlighted::before {
    color: $marker-color-highlight;
  }

  &:before {
    color: white;
    font-size: $icon-size;
    transition: all $duration-noticeable linear;
  }

  &__labels {
    background: white;

    &--desktop {
      overflow: visible;
      position: absolute;
      right: 0;
      bottom: 0;
      width: 320px;
      height: auto;
      max-height: 70vh;
      border: 1px solid $color-bluegrey;
      color: black;
      text-shadow: none;
      transform: translate3D(-30%, 50%, 0);

      &:before {
        @include triangle(right, #fff, 15px);

        position: absolute;
        top: 50%;
        right: -15px;
        content: "";
        transform: translate3D(0, -50%, 0);
      }

      .globe-marker__labels__wrapper {
        overflow: hidden !important;
      }
    }

    ul {
      overflow-y: scroll;
      box-sizing: content-box;
      width: 335px;
      max-height: 70vh;
      margin: 0;
      padding: 0 17px 0 0;
      white-space: nowrap;

      -webkit-overflow-scrolling: touch;
      -ms-overflow-style: -ms-autohiding-scrollbar;
    }
  }

  &__label {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    position: relative;
    width: 318px;
    padding: 0.5rem;
    border-bottom: 1px solid $color-bluegrey;
    color: $color-black;
    font-family: "Open Sans";
    cursor: pointer;

    &.is-no-match {
      display: none;
    }

    &__info {
      overflow: hidden;
      flex: 1 1 70%;
      color: $color-black;
    }

    &__cta {
      display: flex;
      position: absolute;
      z-index: $z-globelabels + 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: opacity $duration-noticeable ease;

      .button {
        display: flex;
        flex: 0 1 50%;
        justify-content: center;
        align-items: center;
        color: white;
        background-color: $color-bluegrey-lightest;
        font-size: $fontsize-l;
        cursor: pointer;

        &:hover {
          background-color: $color-petrol;
        }

        &__icon {
          font-size: $min-tap;
        }
      }
    }

    &--desktop {
      .globe-marker__label__cta {
        opacity: 0;
        transition: opacity $duration-noticeable ease;
      }
    }

    &:hover {
      background: $color-bluegrey;

      .globe-marker__label__cta {
        opacity: 1;
      }
    }

    &__icon {
      flex: 0 1 $min-tap;
      font-size: $min-tap;
    }
  }

  &.is-active {
    z-index: $z-globe + 2;
  }

  &.is-active:before,
  &:hover:before {
    color: $marker-color-active;
    font-size: $icon-size-big;
  }

  &.is-active,
  &:hover {
    .globe-marker__labels {
      opacity: 1;
    }
  }
}

/*
MOBILE
*/
.viewport-mobile {
  .globe-marker__labels {
    position: absolute;
    z-index: $z-globelabels;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: calc(50% - $icon-size-big);
    border: 1px solid white;
    box-shadow: 0 -2px 10px $color-black;
    transform: translate3D(0, 0, 0);

    ul {
      width: 100vw;
      height: 35vh;
    }

    &:before {
      @include triangle(up, #fff, 15px);

      position: absolute;
      top: -15px;
      left: 50%;
      content: "";
      transform: translate3D(-50%, 0, 0);
    }

    &__wrapper {
      box-sizing: content-box;
      width: 100%;
      max-height: 40vh;
      transition: all $duration-noticeable ease-in-out;

      -webkit-overflow-scrolling: touch;
    }
  }

  .globe-marker__label {
    overflow-y: scroll;
    overflow-y: hidden;
    width: 100vw;
    color: white;
    font-weight: 700;
    font-size: $fontsize-l;
    transform: translate3D(0, 0, 0);

    &.is-selected {
      .globe-marker__label__cta {
        background-color: white;
      }
    }

    &__cta {
      padding: 0 0.5rem;

      .button {
        flex: 1 0 40%;
        margin: 0.5rem;
        background-color: $color-petrol;
      }
    }

    &__info {
      flex: 1 1 70%;
    }
  }
}

.globe-scene {
  width: 100%;
  height: 100%;
}
</style>