<<<<<<< HEAD
def success_response(data, status=200):
    return {"status": "success", **data}, status

def error_response(message, status=400):
    return {"status": "error", "message": message}, status
=======
from flask import jsonify
from typing import Any, Dict, Optional


def success_response(data: Any = None, message: str = 'Success', status_code: int = 200) -> tuple:
    """
    Create a success response
    
    Args:
        data: Response data
        message: Success message
        status_code: HTTP status code
    
    Returns:
        Tuple of (response, status_code)
    """
    response: Dict[str, Any] = {
        'status': 'success',
        'message': message
    }
    
    if data is not None:
        response['data'] = data
    
    return jsonify(response), status_code


def error_response(message: str = 'Error occurred', status_code: int = 400, errors: Optional[Dict] = None) -> tuple:
    """
    Create an error response
    
    Args:
        message: Error message
        status_code: HTTP status code
        errors: Optional dictionary of field-specific errors
    
    Returns:
        Tuple of (response, status_code)
    """
    response: Dict[str, Any] = {
        'status': 'error',
        'message': message
    }
    
    if errors:
        response['errors'] = errors
    
    return jsonify(response), status_code


def validation_error(errors: Dict[str, str], message: str = 'Validation failed') -> tuple:
    """
    Create a validation error response
    
    Args:
        errors: Dictionary of field errors
        message: Error message
    
    Returns:
        Tuple of (response, status_code)
    """
    return error_response(message=message, status_code=422, errors=errors)


def not_found_error(message: str = 'Resource not found') -> tuple:
    """
    Create a 404 not found error response
    
    Args:
        message: Error message
    
    Returns:
        Tuple of (response, status_code)
    """
    return error_response(message=message, status_code=404)


def unauthorized_error(message: str = 'Unauthorized') -> tuple:
    """
    Create a 401 unauthorized error response
    
    Args:
        message: Error message
    
    Returns:
        Tuple of (response, status_code)
    """
    return error_response(message=message, status_code=401)


def forbidden_error(message: str = 'Forbidden') -> tuple:
    """
    Create a 403 forbidden error response
    
    Args:
        message: Error message
    
    Returns:
        Tuple of (response, status_code)
    """
    return error_response(message=message, status_code=403)


>>>>>>> 9f614c7bb64b1d469b67648a4b73423c1a96b00f
