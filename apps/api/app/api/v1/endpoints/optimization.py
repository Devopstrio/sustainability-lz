from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_optimization():
    return {'recommendations': [{'id': 'rec-1', 'type': 'RIGHTSIZING', 'resource': 'eks-prod-node-1', 'savings': 45.5}]}
@router.post('/apply')
def apply_opt(rec_id: str):
    return {'status': 'APPLIED', 'id': rec_id}
