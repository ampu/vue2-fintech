import {Ref, watchEffect} from 'vue'

export const useEscapeListener = (active: Ref<boolean>, callback: VoidFunction = () => (active.value = false)) => {
  watchEffect((onCleanup) => {
    if (!active.value) {
      return
    }
    const onDocumentKeyDown = ({key}: KeyboardEvent) => {
      if (key === `Escape`) {
        callback()
      }
    }
    document.addEventListener(`keydown`, onDocumentKeyDown)
    onCleanup(() => {
      document.removeEventListener(`keydown`, onDocumentKeyDown)
    })
  })
}
