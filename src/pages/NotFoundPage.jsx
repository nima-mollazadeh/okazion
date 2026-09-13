import { useEffect } from 'react'
import Button from '../components/ui/Button'

export default function NotFoundPage() {
  useEffect(() => {
    document.title = 'صفحه پیدا نشد | اکازیون'
  }, [])

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-5 px-4 py-20 text-center md:py-28">
      <p className="text-[5.5rem] font-black leading-none text-orange/25 md:text-[7rem]">
        ۴۰۴
      </p>
      <div>
        <h1 className="text-xl font-black text-ink">این صفحه پیدا نشد</h1>
        <p className="mt-2 text-[13px] leading-7 text-mute">
          به نظر می‌رسد این صفحه به جنگل رفته است.
          <br />
          بیا از اول شروع کنیم.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button to="/" variant="primary">
          بازگشت به خانه
        </Button>
        <Button to="/shop" variant="outline">
          رفتن به فروشگاه
        </Button>
      </div>
    </div>
  )
}
