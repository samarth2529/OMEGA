import asyncio
import logging

class SpiderSense:
    def __init__(self, callback):
        self.active = False
        self.callback = callback
        self.baseline_frames = []

    def activate(self):
        self.active = True
        logging.info("Spider Sense Activated.")

    def deactivate(self):
        self.active = False
        self.baseline_frames = []
        logging.info("Spider Sense Deactivated.")

    async def analyze_frame(self, frame_data: str, source: str):
        if not self.active:
            return
        
        # Here we would normally run a lightweight CV algorithm or diff against baseline
        # For now, we simulate detection logic
        # In the future, this hooks into Gemini to ask "Did something significantly change?"
        
        # We maintain a tiny local cache of frames
        self.baseline_frames.append(frame_data)
        if len(self.baseline_frames) > 3:
            self.baseline_frames.pop(0)
            
        # Example triggering condition placeholder
        # if detect_anomaly(self.baseline_frames):
        #    await self.callback("Spider Sense Alert: Detected unusual movement in camera.")
