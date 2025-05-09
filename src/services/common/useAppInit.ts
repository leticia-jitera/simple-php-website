import { useCallback, useEffect } from "react"
import { commonStore } from "states/common"
import { i18n } from "i18n"
import { useStore } from "zustand"

export const useAppInit = () => {
  const common = useStore(commonStore)

  const init = useCallback(async () => {
    await commonStore.persist.rehydrate()
    const language = commonStore.getState().language
    i18n.locale = language
  }, [])

  return {
    init,
    common,
  }
}