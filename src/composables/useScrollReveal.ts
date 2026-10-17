import { onMounted, onUnmounted, nextTick, type Ref } from 'vue'

export interface ScrollRevealOptions {
  selector?: string
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useScrollReveal(
  containerRef?: Ref<HTMLElement | null>,
  options: ScrollRevealOptions = {}
) {
  const {
    selector = '.comic-pop',
    threshold = 0.12,
    rootMargin = '0px 0px -30px 0px',
    once = true,
  } = options

  let observer: IntersectionObserver | null = null

  const initObserver = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return
    }

    const root = containerRef?.value || document
    if (!root) return

    if (typeof IntersectionObserver === 'undefined') {
      // Fallback: reveal immediately
      const elements = root.querySelectorAll(selector)
      elements.forEach((el) => el.classList.add('is-revealed'))
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            if (once && observer) {
              observer.unobserve(entry.target)
            }
          } else if (!once) {
            entry.target.classList.remove('is-revealed')
          }
        })
      },
      {
        threshold,
        rootMargin,
      }
    )

    const targets = root.querySelectorAll(selector)
    targets.forEach((target) => {
      observer?.observe(target)
    })
  }

  onMounted(() => {
    nextTick(() => {
      initObserver()
    })
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  })

  return {
    refresh: () => {
      nextTick(() => {
        initObserver()
      })
    },
  }
}
