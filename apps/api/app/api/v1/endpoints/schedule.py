from fastapi import APIRouter, Body
router = APIRouter()
@router.post('/')
def schedule_job(data: dict = Body(...)):
    return {'status': 'SCHEDULED', 'optimal_start': '2026-05-02T02:00:00Z', 'saving_pct': 18.5}
