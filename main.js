let app = new Vue({
  el: '#app',
  data: {
    page1: '',
    page2: '',
    width_mode: 'auto',
    width: 360,
    comp_mode: false,
    overlay_mode: 'blend',
    opacity: 1,
    slider: 0.5,
    offset1: 0,
    offset2: 0,
    page2isScroll: false
  },
  watch: {
    page1(val) {
      localStorage.setItem('page1', this.page1)
    },
    page2(val) {
      localStorage.setItem('page2', this.page2)
    },
    width_mode(val) {
      localStorage.setItem('width_mode', this.width_mode)
    },
    width(val) {
      if(val < 1) this.width = 1
      localStorage.setItem('width', this.width)
    },
    comp_mode(val) {
      localStorage.setItem('comp_mode', this.comp_mode)
    },
    overlay_mode(val) {
      localStorage.setItem('overlay_mode', this.overlay_mode)
    },
    opacity(val) {
      localStorage.setItem('opacity', this.opacity)
    },
    slider(val) {
      localStorage.setItem('slider', this.slider)
    },
    offset1(val) {
      localStorage.setItem('offset1', this.offset1)
    },
    offset2(val) {
      localStorage.setItem('offset2', this.offset2)
    }
  },
  computed: {
    getOpacity () {
      if (this.comp_mode && this.overlay_mode !== 'swipe') return this.opacity
      else return 1
    },
    page1Offset () {
      return (4 - Number(this.offset1)) + 'px'
    },
    page2Offset () {
      return (4 - Number(this.offset2)) + 'px'
    },
    swipeStyle () {
      if (this.comp_mode && this.overlay_mode=='swipe') {
        if (this.width_mode == 'auto')
          return { 'width': ((1-this.slider) * 100) + '%' }
        else
          return { 'width': (this.width * (1-this.slider)) + 'px' }
      }
      return { 'width': '100%' }
    },
    containerWidth () {
      if (this.width_mode == 'auto')
        return '100%'
      if (this.comp_mode) {
        return this.width+'px'
      } else {
        return (this.width*2+4)+'px'
      }
    }
  },
  methods: {
    pageWidth (page) {
      if (this.width_mode == 'auto') {
        if (this.comp_mode && this.overlay_mode=='swipe') {
          // swipe full
          if (page==2) return (1/(1-this.slider) * 100) + '%'
          /* totally complicated lol */
          else return '100%'
        } else if (this.comp_mode) { 
          // blend/onion full
          return '100%'
        } else {
          // side by side full
          return 'calc(50% - 2px)'
        }
      } else {
        if (this.comp_mode && this.overlay_mode=='swipe') {
          // swipe fixed
          return this.width+'px'
        } else if (this.comp_mode) { 
          // blend/onion fixed
          return this.width+'px'
        } else {
          // side by side fixed
          return this.width+'px'
        }
      }
    },
    toggleWidthMode () {
      if (this.width_mode == 'auto') this.width_mode = 'custom'
      else if (this.width_mode == 'custom') this.width_mode = 'fixed'
      else this.width_mode = 'auto'
    },
    toggleOverlayMode () {
      if (this.overlay_mode == 'blend') this.overlay_mode = 'onion'
      else if (this.overlay_mode == 'onion') this.overlay_mode = 'swipe'
      else this.overlay_mode = 'blend'
    },
    getInputSize (val, s) {
      return Math.max((val.length+1) || s)
    }
  },
  beforeMount () {
    console.log(localStorage.getItem('width'))
    if(localStorage.getItem('page1')!==null) this.page1 = localStorage.getItem('page1')
    if(localStorage.getItem('page2')!==null) this.page2 = localStorage.getItem('page2')
    if(localStorage.getItem('width_mode')!==null) this.width_mode = localStorage.getItem('width_mode')
    if(localStorage.getItem('width')!==null) this.width = localStorage.getItem('width')
    if(localStorage.getItem('comp_mode')!==null) this.comp_mode = localStorage.getItem('comp_mode')
    if(localStorage.getItem('overlay_mode')!==null) this.overlay_mode = localStorage.getItem('overlay_mode')
    if(localStorage.getItem('opacity')!==null) this.opacity = localStorage.getItem('opacity')
    if(localStorage.getItem('slider')!==null) this.slider = localStorage.getItem('slider')
    if(localStorage.getItem('offset1')!==null) this.offset1 = localStorage.getItem('offset1')
    if(localStorage.getItem('offset2')!==null) this.offset2 = localStorage.getItem('offset2')
  }
})
