from enum import Enum

class OmegaMode(Enum):
    NORMAL = "NORMAL"
    CONVERSATION = "CONVERSATION"
    VISION = "VISION"
    ANALYSIS = "ANALYSIS"
    CODING = "CODING"
    RESEARCH = "RESEARCH"
    AUTOMATION = "AUTOMATION"
    SPIDER_SENSE = "SPIDER_SENSE"
    AUTONOMOUS = "AUTONOMOUS"

class ModeManager:
    def __init__(self):
        self.current_mode = OmegaMode.NORMAL

    def set_mode(self, mode_name: str) -> bool:
        try:
            self.current_mode = OmegaMode[mode_name.upper()]
            return True
        except KeyError:
            return False

    def get_mode(self) -> OmegaMode:
        return self.current_mode
