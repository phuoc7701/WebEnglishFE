import { useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import UserForm from "./UserForm"
import axios from "axios"

export default function AddUserDialog({
  roleOptions,
  user,
  onSave,
}: {
  roleOptions: { value: string; label: string }[]
  user?: any
  onSave: (updatedUser: any) => void | Promise<void>
}) {
  const [role, setRole] = useState<string>("")
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    username: "",
    fullname: "",
    email: "",
    dob: "",
    password: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    if (!form.username) newErrors.username = "Vui lòng nhập tên đăng nhập"
    if (!form.fullname) newErrors.fullname = "Vui lòng nhập họ tên"
    if (!form.email) newErrors.email = "Vui lòng nhập email"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Email không đúng định dạng"
    if (!form.dob) newErrors.dob = "Vui lòng nhập ngày sinh"
    if (!form.password) newErrors.password = "Vui lòng nhập mật khẩu"
    else if (form.password.length < 8)
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự"
    if (!role) newErrors.role = "Vui lòng chọn vai trò"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    let msg = "";
    if (e.target.name === "email" && e.target.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
      msg = "Email không đúng định dạng";
    }
    setErrors({ ...errors, [e.target.name]: msg });
    if (e.target.name === "role") setRole(e.target.value);
  }

  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    if (!validate()) return

    const data = {
      ...form,
      role,
    }

    try {
      const res = await axios.post("http://localhost:8080/engzone/users", data)
      alert("Tạo người dùng thành công!")
      await onSave(res.data)
      setOpen(false)
      setRole("")
      setForm({
        username: "",
        fullname: "",
        email: "",
        dob: "",
        password: "",
      })
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(JSON.stringify(err.response?.data))
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Thêm mới</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]" style={{ maxHeight: "80vh", overflowY: "auto" }}>
        <DialogHeader>
          <DialogTitle style={{fontSize: "28px"}}>Thêm người dùng mới</DialogTitle>
          <DialogDescription>
            Điền đầy đủ thông tin bên dưới để tạo người dùng.
          </DialogDescription>
        </DialogHeader>

        <form id="user-form" onSubmit={handleSubmit} className="grid gap-4 py-4">
          <UserForm
            role={role}
            setRole={setRole}
            roleOptions={roleOptions}
            form={form}
            errors={errors}
            onChange={handleChange}
            onBlur={handleBlur}      // Thêm dòng này
            touched={touched}        // Thêm dòng này
            submitted={submitted}
          />
        </form>

        <DialogFooter>
          <Button type="submit" form="user-form">
            Thêm người dùng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}