from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_carbon_summary():
    return {'total_carbon_g': 125000, 'intensity_score': 85, 'status': 'OPTIMIZED'}
