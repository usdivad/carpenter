from time import time
import wave
kaishi = time()

wav1 = wave.open('../wav/sprite_gtr_whole.wav', 'r')

'''
whole2: separate export of wave (to compare 'equality')
middle1: sub-wave starting from beginning of the file
middle2: sub-wave starting in middle of file
'''
wav2 = wave.open('../wav/sprite_gtr_middle1.wav', 'r')

#gives a similarity score
SIMILARITY_THRESHOLD = 0.4999
def similarity_wav(w1, w2):
    w1.rewind()
    w2.rewind()
    length = min(w1.getnframes(), w2.getnframes())
    total = 0.

    #trying to find a starting point for subsequence
    needle = w1
    haystack = w2
    if w1.getnframes() > w2.getnframes():
        needle = w2
        haystack = w1

    starting_points = []
    needle_start = needle.readframes(1)
    needle_second = needle.readframes(1)
    needle_length = needle.getnframes()
    haystack_length = haystack.getnframes()
    for i in xrange(haystack_length):
        if haystack_length - i < needle_length:
            break

        if similarity_frame(haystack.readframes(1), needle_start) > SIMILARITY_THRESHOLD:
            if similarity_frame(haystack.readframes(1), needle_second) > SIMILARITY_THRESHOLD:
                starting_points.append(haystack.tell())

    print str(len(starting_points)) + ' potential starting points'

    w1.rewind()
    w2.rewind()
    for i in xrange(length):
        f1 = w1.readframes(1)
        f2 = w2.readframes(1)
        sf = similarity_frame(f1, f2)
        # print sf

        # # Approach 1: add the similarity value
        # total += sf

        # # Approach 2: add 1 if above similarity threshold
        if sf > SIMILARITY_THRESHOLD:
            total += 1

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
CONTAIN_THRESHOLD = 0.55
def contains(w1, w2):
    needle = w1
    haystack = w2
    if w1.getnframes() > w2.getnframes():
        needle = w2
        haystack = w1

    print 'needle: ' + str(needle.getnframes())
    print 'haystack: ' + str(haystack.getnframes())

    similarity = similarity_wav(needle, haystack)
    print 'similarity is ' + str(similarity)
    if similarity > CONTAIN_THRESHOLD:
        return True
    else:
        return False

print contains(wav2, wav1)


jiesu = time()
print('runtime: %g seconds' % (jiesu-kaishi))

# better to check each sample and output dots of those?
# OR just do a similarity on the whole "string"
# convert the wave into an array? space inefficient tho