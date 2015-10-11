#!/usr/bin/env python

from pybrain.structure import RecurrentNetwork
from pybrain.structure import LinearLayer, SigmoidLayer
from pybrain.structure import FullConnection


n = RecurrentNetwork()

n.addInputModule(LinearLayer(2, name='in'))
n.addModule(SigmoidLayer(3, name='hidden'))
n.addOutputModule(LinearLayer(1, name='out'))
n.addConnection(FullConnection(n['in'], n['hidden'], name='con1'))
n.addConnection(FullConnection(n['hidden'], n['out'], name='con2'))

#The RecurrentNetwork class has one additional method, .addRecurrentConnection(), which looks back in time one timestep. We can add one from the hidden to the hidden layer:
n.addRecurrentConnection(FullConnection(n['hidden'], n['hidden'], name='con3'))

n.sortModules()


print n.activate((2, 2))
print n.activate((2, 2))
print n.activate((2, 2))


n.reset()
print n.activate((2, 2))
print n.activate((2, 2))
print n.activate((2, 2))
