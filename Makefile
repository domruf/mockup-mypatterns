# Name of git binary in path or path to it
GIT = git
# Name of npm binary in path or path to it
NPM = npm

# When doing ``npm link``, we have to deal with different node versions
# differently. So,
# First get the node version, e.g. "0.11.12"
NODE_VERSION = $(shell node -v)
# Now get the major version, e.g. "0"
NODE_VERSION_MAJ = $(shell echo $(NODE_VERSION) | cut -f1 -d. | cut -f2 -dv )
# Then get the minor version, E.g. 11
NODE_VERSION_MIN = $(shell echo $(NODE_VERSION) | cut -f2 -d.)
# Finally, test , the version is below "0.11", E.g. "0.10"
NODE_VERSION_LT_011 = $(shell [ $(NODE_VERSION_MAJ) -eq 0 -a $(NODE_VERSION_MIN) -lt 11 ] && echo true)

# Path to the project's local grunt binary.
GRUNT = ./node_modules/grunt-cli/bin/grunt
# Path to the project's local bower binary.
BOWER = ./node_modules/bower/bin/bower
# Path to the directory, where all node_modules are stored.
NODE_PATH = ./node_modules

# Initialize DEBUG and VERBOSE mode for grunt. Arguments to the `make` script
# land in $(ARGUMENT_NAME) variables.
# In this case, DEBUG is invoked e.g. with: `make all debug=true`
DEBUG =
ifeq ($(debug), true)
	DEBUG = --debug
endif
VERBOSE =
ifeq ($(verbose), true)
	VERBOSE = --verbose
endif


# Make tasks

# All runs tasks test-once, bundles and docs
all: test-once bundles docs

bundle-widgets:
	rm -rf build
	mkdir -p build
	NODE_PATH=$(NODE_PATH) $(GRUNT) bundle-widgets $(DEBUG) $(VERBOSE)

# Docs build task
docs:
	mkdir -p build
	rm -rf build
	NODE_PATH=$(NODE_PATH) $(GRUNT) bundle-docs $(DEBUG) $(VERBOSE)

bootstrap-common:
	mkdir -p build

bootstrap: bootstrap-common
	@echo node version: $(NODE_VERSION)
ifeq ($(NODE_VERSION_LT_011),true)
	# for node < v0.11.x
	$(NPM) link --prefix=.
	# remove lib/node_modules, which contains a symlink to the project root.
	# This leads to infinite recursion at the grunt copy task on make docs.
	rm -rf lib/node_modules
else
	$(NPM) link
endif
	NODE_PATH=$(NODE_PATH) $(BOWER) install --config.interactive=0
	NODE_PATH=$(NODE_PATH) $(GRUNT) sed:bootstrap $(DEBUG) $(VERBOSE)

# JSHint checker task
jshint:
	NODE_PATH=$(NODE_PATH) $(GRUNT) jshint jscs $(DEBUG) $(VERBOSE)

# Run grunt and watch for changes.  TODO: run what?
watch:
	NODE_PATH=$(NODE_PATH) $(GRUNT) watch $(DEBUG) $(VERBOSE)

# Run tests headless via PhantomJS and watch for changes.
test:
	NODE_PATH=$(NODE_PATH) $(GRUNT) test $(DEBUG) $(VERBOSE) --pattern=$(pattern)

# Run the tests headless with PhantomJS only once and exit.
test-once:
	NODE_PATH=$(NODE_PATH) $(GRUNT) test_once $(DEBUG) $(VERBOSE) --pattern=$(pattern)

# Run the tests for Chromium and watch for changes.
test-dev:
	NODE_PATH=$(NODE_PATH) $(GRUNT) test_dev $(DEBUG) $(VERBOSE) --pattern=$(pattern)

# Run the tests in a continious integration setup.
test-ci:
	NODE_PATH=$(NODE_PATH) $(GRUNT) test_ci $(DEBUG) $(VERBOSE)

# Cleanup the project and remove directories set up by previous tasks 
clean:
	mkdir -p build
	rm -rf build
	rm -rf node_modules
	rm -rf bower_components

# Also clean bower and npm caches.
clean-deep: clean
	if test -f $(BOWER); then $(BOWER) cache clean; fi
	if test -f $(NPM); then $(NPM) cache clean; fi

# Expose these options to the command line shell expansion mechanism
.PHONY: all bundle-minimalpattern docs bootstrap jshint test test-once test-dev test-ci clean clean-deep
