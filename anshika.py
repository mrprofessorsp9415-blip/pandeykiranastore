import speech_recognition as sr
import webbrowser
import os
import time
import brightness_control
import musiclibrary
import talklibrary

recognizer = sr.Recognizer()

# -------- FORCE CHROME --------
CHROME_PATH = "C:/Program Files/Google/Chrome/Application/chrome.exe"
webbrowser.register(
    'chrome',
    None,
    webbrowser.BackgroundBrowser(CHROME_PATH)
)

# -------- SPEAK (EXTERNAL PROCESS FIX) --------
def speak(text):
    os.system(
        f'python -c "import pyttsx3; '
        f'e=pyttsx3.init(); '
        f'voices=e.getProperty(\'voices\'); '
        f'e.setProperty(\'voice\', voices[1].id); '
        f'e.setProperty(\'rate\',115); '
        f'e.say(\'{text}\'); '
        f'e.runAndWait()"'
    )

# -------- COMMAND PROCESS --------
def processCommand(c):
    print("Command:", c)
    c = c.lower()

    if "open youtube" in c:
        speak("Opening YouTube")
        webbrowser.get('chrome').open("https://www.youtube.com")

    elif "ring ceremony" in c:
        video_path = "C://Users//ashuc//Videos"
        speak("opening ring ceremony of suraj")
        os.startfile(video_path)


    elif "google" in c:
        speak("Opening Google")
        webbrowser.get('chrome').open("https://www.google.com")


    elif "Open" in c:
        speak("Opening whatsapp ")
        webbrowser.get('chrome').open("htt")


    elif "whatsapp" in c:
        speak("Opening whatsapp")
        webbrowser.get('chrome').open("https://web.whatsapp.com")


    elif "open gpt" in c:
        speak("opening chatgpt")
        webbrowser.get('chrome').open("https://www.chatgpt.com")



    # Library music k
    elif c.lower().startswith("play"):
        song = c.lower().split(" ")[1]
        link = musiclibrary.music[song]
        webbrowser.get('chrome').open(link)



    # Library chat k
    elif c.lower().startswith("open"):
        chat = c.lower().split(" ")[1]
        link = talklibrary.talk[chat]
        webbrowser.get('chrome').open(link)



    # 🔆 Brightness UP
    elif "brightness increase" in command:
        level = brightness_control.brightness_up()
        if level is not None:
            speak(f"Brightness up to {level} percent")
        else:
            speak("I cannot control brightness")

    # 🔅 Brightness DOWN
    elif "brightness down" in command:
        level = brightness_control.brightness_down()
        if level is not None:
            speak(f"Brightness down to {level} percent")
        else:
            speak("I cannot control brightness")


    else:
        speak("Command received")

# -------- MAIN --------
if __name__ == "__main__":
    speak("Initializing Anshika")

    while True:
        try:
            with sr.Microphone() as source:
                print("Listening for wake word...")
                recognizer.adjust_for_ambient_noise(source, duration=0.1)
                audio = recognizer.listen(source)

            word = recognizer.recognize_google(audio)
            print("Heard:", word)

            if word.lower() == "anshika":
                time.sleep(0.3)
                speak("Ya")

                with sr.Microphone() as source:
                    print("Anshika Active...")
                    recognizer.adjust_for_ambient_noise(source, duration=0.1)
                    audio = recognizer.listen(source)

                command = recognizer.recognize_google(audio)
                processCommand(command)

        except Exception as e:
            print("Error:", e)

