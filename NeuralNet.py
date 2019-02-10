from __future__ import absolute_import, division, print_function

import tflearn
# Regression data- 2 training instances
#10 input features per instance.
with open("./data.txt", "r") as f:
    data = eval(f.read())
X=[[10], [30]]
# So our data gives us the state, the date, the severity, and all the weights. We'll need to travel forward and get the weights in the future - if possible.
# This is the part I'm kind of dreading...
for i in range(0, len(data), 1):
    # One of our xs will be the array we get here. Our y will be data[i + 1][0]
    # X.push([])
    if len(data[i][3]) != 53:
        print(len(data[i][3]))
    # if data[i + 1]:
        # Y.push([data[i + 1][2])
#2 output features per instance

Y = [[1], [3]]

# Just 1d - for now.
# Simple linear regression.
input_ = tflearn.input_data(shape=[None,len(X[0])])
r1 = tflearn.fully_connected(input_,10)
#2-d fully connected layer for output
r1 = tflearn.fully_connected(r1, len(Y[0]))
r1 = tflearn.regression(r1, optimizer='sgd', loss='mean_square',
                                        metric='R2', learning_rate=0.01)
m = tflearn.DNN(r1)
m.fit(X,Y, n_epoch=200, show_metric=True, snapshot_epoch=False)

#Predict for 1 instance
testinstance=[[3]]
print("\nInput features:  ",testinstance)
print("\n Predicted output: ")
print(m.predict(testinstance))