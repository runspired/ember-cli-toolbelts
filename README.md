# Ember-cli-toolbelts

[![Build Status](https://travis-ci.org/runspired/ember-cli-toolbelts.svg)](https://travis-ci.org/runspired/ember-cli-toolbelts)

[![npm version](https://badge.fury.io/js/ember-cli-toolbelts.svg)](http://badge.fury.io/js/ember-cli-toolbelts)
[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-toolbelts.svg)](http://emberobserver.com/addons/ember-cli-toolbelts)

Toolbelts are specialized blueprints that help you maintain your dependencies or build a specific feature set faster.

## Using Toolbelts

To run a toolbelt, use the toolbelt command.

Example: `ember toolbelt travis`

## Available Toolbelts

- addon-dev
- devtools
- mobile
- performance
- travis
- update-ember

## Submitting new Toolbelts

If you've built a toolbelt that you find particularly useful, please consider a PR to add it here.

### Create a new Toolbelt

`ember g toolbelt <foo>`

This will create a new toolbelt blueprint with the name `toolbelt-<foo>`.

In addition to typical blueprint helpers, toolbelts have the following methods available to them.

- readPackage
- installToolbelt
- getRepository
- updateOptions
- updateReadMe
- addDependencyToProject
- addDependenciesToProject
- removeDependencyFromProject
- removeDependenciesFromProject

Browse existing toolbelts to see some of what they can do.
