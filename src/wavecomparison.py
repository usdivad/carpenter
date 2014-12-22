'''
    Compare two .wav files to see if one is a sub-wave of the other
'''

from time import time
import wave
kaishi = time()

wav1 = wave.open('../wav/sprite_gtr_whole2.wav', 'r')

'''
whole2: separate export of wave (to compare 'equality')
middle1: sub-wave starting from beginning of the file
middle2: sub-wave starting in middle of file
'''
wav2 = wave.open('../wav/sprite_gtr_middle2.wav', 'r')

#gives a similarity score
SIMILARITY_THRESHOLD = 0.5
NEEDLE_START_SIZE = 5
def similarity_wav(w1, w2):
    if (w1.getnframes() == w2.getnframes()):
        return similarity_wav_samesize(w1, w2)
    else:
        #trying to find a starting point for subsequence
        needle = w1
        haystack = w2
        if w1.getnframes() > w2.getnframes():
            needle = w2
            haystack = w1
        return similarity_wav_diffsize(needle, haystack)

def similarity_wav_diffsize(needle, haystack):
    best_similarity = 0.
    best_pos = 0

    #set up array of needle_start (so we don't have too many potential starting points)
    starting_points = []
    needle_start = []
    for i in xrange(NEEDLE_START_SIZE):
        needle_start.append(needle.readframes(1))
    needle_length = needle.getnframes()
    if needle_length < 1:
        return 0
    haystack_length = haystack.getnframes()

    print 'needle: ' + str(needle_length)
    print 'haystack: ' + str(haystack_length)
    
    #find potential starting points
    for i in xrange(haystack_length):
        if haystack_length - i < needle_length:
            break

        similar = True
        for i in xrange(len(needle_start)):
            if similarity_frame(haystack.readframes(1), needle_start[i]) < SIMILARITY_THRESHOLD:
                similar = False
                break
        if similar:
            starting_points.append(haystack.tell() - len(needle_start))

    print str(len(starting_points)) + ' potential starting points'
    # print starting_points

    #calculate similarity
    for i in xrange(len(starting_points)):
        current_total = 0.
        current_similarity = 0.
        needle.rewind()
        haystack.setpos(starting_points[i])

        for j in xrange(needle_length): #technically we could start at NEEDLE_START_SIZE for efficiency
            fn = needle.readframes(1)
            fh = haystack.readframes(1)
            sf = similarity_frame(fn, fh)

            if sf >= SIMILARITY_THRESHOLD:
                current_total += 1

        current_similarity = current_total / needle_length
        if current_similarity > best_similarity:
            best_similarity = current_similarity
            best_pos = starting_points[i]
        print 'current_similarity = ' + str(current_similarity)

    print 'best_similarity = ' + str(best_similarity) + ' at pos ' + str(best_pos)
    return best_similarity

def similarity_wav_samesize(w1, w2):
    w1.rewind()
    w2.rewind()
    total = 0.
    length = min(w1.getnframes(), w2.getnframes())
    if length < 1:
        return 0
    print 'both wavs are of length ' + str(length)

    for i in xrange(length):
        f1 = w1.readframes(1)
        f2 = w2.readframes(1)
        sf = similarity_frame(f1, f2)
        # print sf

        # # Approach 1: add the similarity value
        # total += sf

        # # Approach 2: add 1 if above similarity threshold
        if sf >= SIMILARITY_THRESHOLD:
            total += 1

    return total / length

def similarity_frame(f1, f2):
    total = 0.
    length = min(len(f1), len(f2))
    if length < 1:
        return 0
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
    similarity = similarity_wav(w1, w2)
    print 'similarity is ' + str(similarity)
    if similarity > CONTAIN_THRESHOLD:
        return True
    else:
        return False

print contains(wav2, wav1)

# #testing ideal start size (bottoms out around 46)
# for i in xrange(50):
#     NEEDLE_START_SIZE = i
#     print str(i) + 'th run:'
#     similarity_wav(wav1, wav2)


jiesu = time()
print('runtime: %g seconds' % (jiesu-kaishi))

# better to check each sample and output dots of those?
# OR just do a similarity on the whole "string"
# convert the wave into an array? space inefficient tho