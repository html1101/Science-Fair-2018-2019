from __future__ import absolute_import, division, print_function

import tflearn
import numpy as np
import json
print(np.random.rand(10,10).tolist())
# Regression data- 2 training instances
#10 input features per instance.
X=[[4, 2], [10, 2], [8, 10]]
#2 output features per instance
Y=[[6], [12], [18]]

# Multiple Regression graph, 10-d input layer
input_ = tflearn.input_data(shape=[None,2])
#10-d fully connected layer
r1 = tflearn.fully_connected(input_,10)
#2-d fully connected layer for output
r1 = tflearn.fully_connected(r1,1)
r1 = tflearn.regression(r1, optimizer='sgd', loss='mean_square',
                                        metric='R2', learning_rate=0.01)


m = tflearn.DNN(r1)
m.fit(X,Y, n_epoch=100, show_metric=True, snapshot_epoch=False)

#Predict for 1 instance
testinstance=[[2, 3]]
print("\nInput features:  ",testinstance)
print("\n Predicted output: ")
print(m.predict(testinstance))
use = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming"
]
with open("./NeuralDataParsed.json", "r") as f:
    content = json.loads(f.read())

