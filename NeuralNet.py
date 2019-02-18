from __future__ import absolute_import, division, print_function

import tflearn
import random
import numpy
with open("./data.txt", "r") as f:
    data = eval(f.read())
XX = []
# So our data gives us the state, the date, the severity, and all the weights. We'll need to travel forward and get the weights in the future - if possible.
# One of our xs will be the array we get here. Our y will be data[i + 1][0]
# X.push([])
# data[i] = [state, date, weights]
# We need to group them by state... and make a different NN. For each state.
ourStuff = []
while (len(data)):
    # Here we're splicing our stuff out
    try:
        if (data[0][0] == data[1][0]):
            # data[0][2] is our severity
            ourStuff.append([data[0][2], data[0][3]])
        else:
            XX.append([data[0][0], ourStuff])
            ourStuff = []
    except IndexError:
        # Do nothing
        print("Done with parsing")
    data.pop(0)
#2 output features per instance
for i in range(3, 5):
    # Name of state: XX[i][0]; data: XX[i][1]
    # So. With the data, our Xs will be our giant, long inputs. We'll push those into our X.
    X = []
    Y = []
    testinstance = []
    for ii in range(len(XX[i][1]) - 1):
        # Here we get our data
        X.append(XX[i][1][ii][1])
        Y.append([XX[i][1][ii + 1][0]])
        testinstance.append([XX[i][1][ii][1], XX[i][1][ii + 1][0]])
    input_ = tflearn.input_data(shape=[None,len(X[0])])
    #10-d fully connected layer
    r1 = tflearn.fully_connected(input_,len(X[0]))
    # r1 = tflearn.fully_connected(r1, len(X[0]))
    # r1 = tflearn.fully_connected(r1, len(X[0]))
    r1 = tflearn.fully_connected(r1, len(X[0]), activation="relu")
    #2-d fully connected layer for output
    r1 = tflearn.fully_connected(r1, len(Y[0]))
    r1 = tflearn.regression(r1, optimizer='sgd', loss='mean_square',
                                            metric='R2', learning_rate=0.01)
    m = tflearn.DNN(r1, tensorboard_dir='tflearn_logs')
    # print(len(X), len(Y))
    print(X, Y)
    m.fit(X,Y, n_epoch=50, show_metric=True, snapshot_epoch=False, run_id=XX[i][0])
    #Predict for 1 instance
    # weights = m.get_weights(r1.W)
    X = []
    Y = []