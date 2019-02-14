from __future__ import absolute_import, division, print_function

import tflearn
import random
# Regression data- 2 training instances
#10 input features per instance.
with open("./data.txt", "r") as f:
    data = eval(f.read())
XX = []
# So our data gives us the state, the date, the severity, and all the weights. We'll need to travel forward and get the weights in the future - if possible.
# This is the part I'm kind of dreading...
# One of our xs will be the array we get here. Our y will be data[i + 1][0]
# X.push([])
# data[i] = [state, date, weights]
# We need to group them by state... and make a different NN. For each state.
# Ohhhh dear.
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
#for i in XX:
#print(i, "\n")
#2 output features per instance
#print(X)

# Just 1d - for now.
# Simple linear regression.
for i in range(10, 11):
    # Name of state: XX[i][0]; data: XX[i][1]
    # So. With the data, our Xs will be our giant, long inputs. We'll push those into our X.
    X = []
    Y = []
    testinstance = []
    print(XX[i][0])
    for ii in range(len(XX[i][1]) - 1):
        # Here we get our data
        X.append(XX[i][1][ii][1])
        Y.append([XX[i][1][ii + 1][0]])
        if XX[i][1][ii][1][0] != 1:
            testinstance.append([XX[i][1][ii][1], XX[i][1][ii + 1][0]])
    input_layer = tflearn.input_data(shape=[None, len(X[0])])
    dense1 = tflearn.fully_connected(
        input_layer,
        len(Y[0]),
        activation='tanh',
        regularizer='L2',
        weight_decay=0.001)
    dropout1 = tflearn.dropout(dense1, 0.5)
    dense2 = tflearn.fully_connected(
        dropout1,
        len(Y[0]),
        activation='tanh',
        regularizer='L2',
        weight_decay=0.001)
    dropout2 = tflearn.dropout(dense2, 0.5)
    softmax = tflearn.fully_connected(
        dropout2, len(Y[0]), activation='softmax')

    # Regression using SGD with learning rate decay and Top-3 accuracy
    sgd = tflearn.SGD(learning_rate=0.1, lr_decay=0.96, decay_step=1000)
    top_k = tflearn.metrics.Top_k(3)
    net = tflearn.regression(
        softmax, optimizer=sgd, metric=top_k, loss='categorical_crossentropy')

    # Training
    model = tflearn.DNN(net, tensorboard_verbose=0)
    model.fit(X, Y, n_epoch=40, show_metric=True, run_id="dense_model")
    # print("\nInput: ", testinstance)
    # print("\nOutput: ", model.predict(testinstance))
    for ii in range(len(testinstance)):
        print("\nInput: ", [testinstance[ii][0]])
        print("\nOutput: ", model.predict([testinstance[ii][0]]))
        print("\nActual Output: ", testinstance[ii][1])
    # input_ = tflearn.input_data(shape=[None, len(X[0])])
    # r1 = tflearn.fully_connected(input_, 10)
    # #2-d fully connected layer for output
    # r1 = tflearn.fully_connected(r1, 1)
    # r1 = tflearn.regression(
    #     r1,
    #     optimizer='sgd',
    #     loss='mean_square',
    #     metric='R2',
    #     learning_rate=0.001)
    # m = tflearn.DNN(r1)
    # m.fit(X, Y, n_epoch=400, show_metric=True, snapshot_epoch=True)
    # #Predict for 1 instance
    # # This one instance will be the last of the range on line 42
    # testinstance = [XX[i][1][len(XX[i][1]) - 1][1]]
    # print("\nInput features:  ", testinstance)
    # print("\n Predicted output: ")
    # print(m.predict(testinstance))

# dataIn = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]]
# dataOut = [[4], [7]]
# input_ = tflearn.input_data(shape=[None, len(dataIn[0])])
# r1 = tflearn.fully_connected(input_, 10)
# #2-d fully connected layer for output
# r1 = tflearn.fully_connected(r1, 1)
# r1 = tflearn.regression(
#     r1, optimizer='sgd', loss='mean_square', metric='R2', learning_rate=0.001)
# m = tflearn.DNN(r1)
# m.fit(dataIn, dataOut, n_epoch=400, show_metric=True, snapshot_epoch=True)
# #Predict for 1 instance
# # This one instance will be the last of the range on line 42
# testinstance = [[2, 3, 4, 5, 6, 7, 8, 9, 10, 11]]
# print("\nInput features:  ", testinstance)
# print("\n Predicted output: ")
# print(m.predict(testinstance))
""" for i in range(1):
    # print(XX[i])
    # Our x will be XX[1][1]
    # Y = []
    # X = []
    # for ii in range(len(XX[i][1]) - 1):
    #     X.append(XX[i][1][ii][1])
    #     Y.append([XX[i][1][ii + 1][0]])
    #     # print(XX[i][0], XX[i][1][ii][1], XX[i][1][ii + 1][0]) # Returns state, [severities], expected severity
    # print(X, "\n\n")
    input_ = tflearn.input_data(shape=[None, len(X[0])])
    r1 = tflearn.fully_connected(input_,10)
    #2-d fully connected layer for output
    r1 = tflearn.fully_connected(r1, len(Y[0]))
    r1 = tflearn.regression(r1, optimizer='sgd', loss='mean_square',
                                        metric='R2', learning_rate=0.00001)
    m = tflearn.DNN(r1)
    m.fit(X,Y, n_epoch=200, show_metric=True, snapshot_epoch=True)
    #Predict for 1 instance
    # This one instance will be the last of the range on line 42
    pos = int(round(random.uniform(0, len(XX[i][1]) - 2), 0))
    testinstance=[XX[i][1][pos][1]]
    print("\nInput features:  ",testinstance)
    print("\n Predicted output: ")
    print(m.predict(testinstance))
    print("Hopefully our output: ", XX[i][1][pos + 1][0])
 """