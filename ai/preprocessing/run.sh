#!/bin/bash
# ai/run.sh
# Wrapper to run the baseline builder script

# Ensure we are in the project root
cd "$(dirname "$0")/../.."

# Check if venv exists
if [ ! -d "ai/venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv ai/venv
    echo "Installing dependencies..."
    ai/venv/bin/pip install -r ai/requirements.txt
fi

# Run the script
# Pass any arguments to the python script (e.g., --dry-run)
echo "Running baseline builder..."
ai/venv/bin/python ai/preprocessing/baseline_builder.py "$@"
