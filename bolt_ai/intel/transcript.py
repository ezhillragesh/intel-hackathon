from youtube_transcript_api import YouTubeTranscriptApi as yta
import re

def getTranscript(video_id):

    data = yta.get_transcript(video_id)
    transcript = ""
    for value in data:
        for key,val in value.items():
            if key== "text":
                transcript += val

    l= transcript.splitlines()
    final_tra = "".join(l)


    file=open("demo.txt", 'w')
    file.write(final_tra)
    file.close()
    text = open("demo.txt", 'r+').read()
    return text