with open("./NeuralDataParsed.txt", "r") as f:
    content = eval(f.read())
'''
Here's a sample:
[
  "Alabama",
  [
   [
    1,
    "Oct-04-2008"
   ],
   [
    1,
    "Oct-11-2008"
   ]
]
This is the data we want.
We're going through each state. Those will be our ys.
'''
data = []
percent = 0
percentIt = 0
for i in content:
    # We're going to find each of the corresponding values for our dates.
    # ex. We have Oct-04-2008, now we look for the rest of the states with that date.
    # Then those severities will be a part of our xs.
    # Going through each of the states...
    for ii in i[1]:
        # This looks at the list of severities in the state.
        # Now we need to find the other states with that date(that rhymed!). We'll push that into an array.
        stateWeight = []
        for z in content:
            # Going through each of the states...
            for iii in z[1]:
                # Going through the info for that state...
                # Checking if the date is the same.
                stateWeight.append(iii[0])
        data.append(
            [i[0], ii[1], ii[0],
             stateWeight])  # The date, the severity, the input severities
        # Here's where things get a little tricky. We also need to get our ys - which are in the future. As I am
        # Absolutely terrible at Python this could get very messy. OR we could push all our weights into a large
        # Array, which we can access and it won't be quite so messy. It'll take longer to execute, but it'll be easier to follow.
    percent = percent + 1
    percentIt = round((percent / len(content)) * 100, 2)
    # print('\x1bc')
    print("\x1bc")
    for eg in range(0, int(percentIt / 2), 1):
        print('=', end='', flush=True)
    print('> ', int(round(percentIt, 0)), "%", end='', flush=True)
print("\n")
with open("./data.txt", "w") as f:
    f.write(str(data))