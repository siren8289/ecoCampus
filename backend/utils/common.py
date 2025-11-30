def success_response(data, status=200):
    return {"status": "success", **data}, status

def error_response(message, status=400):
    return {"status": "error", "message": message}, status
