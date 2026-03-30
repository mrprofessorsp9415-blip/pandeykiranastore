import screen_brightness_control as sbc

def brightness_up(step=10):
    try:
        current = sbc.get_brightness()[0]
        new_level = min(100, current + step)
        sbc.set_brightness(new_level)
        return new_level
    except:
        return None

def brightness_down(step=10):
    try:
        current = sbc.get_brightness()[0]
        new_level = max(0, current - step)
        sbc.set_brightness(new_level)
        return new_level
    except:
        return None
