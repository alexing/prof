#!/usr/bin/env python
from pybrain.structure import FeedForwardNetwork
from pybrain.structure import LinearLayer, SigmoidLayer
from pybrain.structure import FullConnection


#Se construye la red
n = FeedForwardNetwork()
#Se construyen las capas
inLayer = LinearLayer(2, name="input")
hiddenLayer = SigmoidLayer(3, name="hid")
outLayer = LinearLayer(1, name="output")

#Se agregan las capas a la red
n.addInputModule(inLayer)
n.addModule(hiddenLayer)
n.addOutputModule(outLayer)

#Se conectan las capas
in_to_hidden = FullConnection(inLayer, hiddenLayer, name="con1")
hidden_to_out = FullConnection(hiddenLayer, outLayer, name="con2")

#Se agregan las conexiones
n.addConnection(in_to_hidden)
n.addConnection(hidden_to_out)

#All the elements are in place now, so we can do the final step that makes our MLP usable, which is to call the .sortModules() method:
n.sortModules()

print n
print n.activate([3,7])
print in_to_hidden.params
print hidden_to_out.params
print n.params