import wave

wav1 = wave.open('../wav/sprite_gtr_whole.wav', 'r')

'''
whole2: separate export of wave (to compare 'equality')
middle1: sub-wave starting from beginning of the file
middle2: sub-wave starting in middle of file
'''
wav2 = wave.open('../wav/sprite_gtr_middle2.wav', 'r')

#gives a similarity score
def similarity_wav(w1, w2):
    w1.rewind()
    w2.rewind()
    length = min(w1.getnframes(), w2.getnframes())
    # needle_vector = []
    # haystack_vector = []
    total = 0.

    # haystack.readframes(1)
    for i in xrange(length):
        f1 = w1.readframes(1)
        f2 = w2.readframes(1)
        sf = similarity_frame(f1, f2)
        total += sf
        # print sf

    return total / length

def similarity_frame(f1, f2):
    total = 0.
    length = min(len(f1), len(f2))
    for i in xrange(length):
        if f1[i] == f2[i]: #graduate to a better comparison? need to understand how the encoding works
            total += 1
    return total / length

#dot product of two vectors (rep as lists)
def dot_product(v1, v2):
    total = 0
    for i in xrange(len(v1)):
        total += v1[i] * v2[i]
    return total

#see if one wave contains another
ACCURACY_THRESHOLD = 0.55
def contains(w1, w2):
    needle = w1
    haystack = w2
    if w1.getnframes() > w2.getnframes():
        needle = w2
        haystack = w1

    print 'needle: ' + str(needle.getnframes())
    print 'haystack: ' + str(haystack.getnframes())

    d = similarity_wav(needle, haystack)
    print 'd is ' + str(d)
    if d > ACCURACY_THRESHOLD:
        return True
    else:
        return False

print contains(wav2, wav1)



# better to check each sample and output dots of those?
# OR just do a similarity on the whole "string"