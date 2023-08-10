import { classNames } from '@standardnotes/utils'
import { useRef, useState } from 'react'
import Icon from '../Icon/Icon'
import Popover from '../Popover/Popover'
import StyledTooltip from '../StyledTooltip/StyledTooltip'
import VaultSelectionMenu from '../VaultSelectionMenu/VaultSelectionMenu'
import { useApplication } from '../ApplicationProvider'
import { featureTrunkVaultsEnabled } from '@/FeatureTrunk'

const VaultSelectionButton = () => {
  const application = useApplication()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const exclusivelyShownVault = application.vaultDisplayService.exclusivelyShownVault

  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)

  if (!featureTrunkVaultsEnabled()) {
    return null
  }

  return (
    <>
      <StyledTooltip label="Open vault selection menu">
        <button onClick={toggleMenu} className="flex h-full cursor-pointer items-center justify-center" ref={buttonRef}>
          <div className="flex items-center">
            <Icon
              type="safe-square"
              className={classNames(
                isOpen ? 'text-info' : exclusivelyShownVault ? 'text-success' : '',
                'rounded hover:text-info',
              )}
            />
            {exclusivelyShownVault && (
              <div className={classNames('ml-1 text-xs font-bold', isOpen && 'text-info')}>
                {exclusivelyShownVault.name}
              </div>
            )}
          </div>
        </button>
      </StyledTooltip>
      <Popover
        title="Vault options"
        togglePopover={toggleMenu}
        anchorElement={buttonRef.current}
        open={isOpen}
        side="top"
        align="start"
        className="py-2"
      >
        <VaultSelectionMenu />
      </Popover>
    </>
  )
}

export default VaultSelectionButton
