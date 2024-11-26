"use client"
import "./data.css"
import { loaderEmitter } from "@/lib/events";
import { Button, Checkbox, Col, Form, Input, Row, Select } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";

export default function Home() {
    const [form] = Form.useForm();
    const [validation, setValidation] = useState({
        name: { validated: false, required: true },
        type: { validated: false, required: true },
        companies: { validated: false, required: true },
        description: { validated: false, required: false },
        scope: { validated: false, required: false },
        expert: { validated: false, required: true },
    })
    const router = useRouter()
    useEffect(() => {
        loaderEmitter.emit("off")
    }, [])

    const [experts, setExperts]: any = useState({
        all: false,
        industry: false,
        competitor: false,
        executive: false,
        costumer: false,
        partner: false,
    })

    const submit = async () => {
        const newValidation: any = { ...validation }
        const fields = form.getFieldsValue()
        const fieldKeys = Object.keys(fields)

        for (let index = 0; index < fieldKeys.length; index++) {
            const key: string = fieldKeys[index];
            const value: any = fields[key]
            if (newValidation[key].required === false) {
                continue
            }
            if (typeof value === "string" && value.length > 1 || Array.isArray(value) && value.length > 0) {
                newValidation[key].validated = false
            } else {
                newValidation[key].validated = true
            }
        }

        setValidation(newValidation)
    }
    const checkControl = (field: string) => {
        const formValue: any = form.getFieldValue("expert") ? [...form.getFieldValue("expert")] : []

        if (field == "all") {
            if (formValue.includes(field)) {

                form.setFieldValue("expert", [])
                setExperts({
                    all: false,
                    industry: false,
                    competitor: false,
                    executive: false,
                    costumer: false,
                    partner: false,
                })
                return;
            }
            return (
                form.setFieldValue("expert", [
                    "all", "industry", "competitor", "executive", "costumer", "partner",
                ]),
                setExperts({
                    all: true,
                    industry: true,
                    competitor: true,
                    executive: true,
                    costumer: true,
                    partner: true,
                })
            )
        }
        if (formValue.includes(field)) {
            formValue.splice(formValue.indexOf(field), 1)
        } else {
            formValue.push(field)
        }
        const exps: any = { ...experts }

        if (formValue.length === 5) {
            if (formValue.includes("all") == false) {
                form.setFieldValue("expert", [
                    "all", "industry", "competitor", "executive", "costumer", "partner",
                ]),
                    setExperts({
                        all: true,
                        industry: true,
                        competitor: true,
                        executive: true,
                        costumer: true,
                        partner: true,
                    })
                return
            }
            exps["all"] = false
            formValue.splice(formValue.indexOf("all"), 1)
        }

        exps[field] = !exps[field]
        form.setFieldValue("expert", formValue)
        setExperts(exps)

    }

    const [showCompanies, setShowCompanies] = useState(false)
    const checkCompanies = (e: any) => {
        if (e === "company") {
            setShowCompanies(true)
        } else {
            setShowCompanies(false)
        }

    }

    return (
        <div className="data-panel">
            <div className="upload-form">
                <div className="flex justify-between upload-header">
                    <h1>New Data</h1>
                    <CgClose className="clickable" onClick={() => {
                        router.push("/dashboard")
                    }} />
                </div>
                <Form form={form} layout="vertical">
                    <div>
                        <label id="name"> Project name <span className="text-red-600">*</span>{validation.name.validated ? <span className="text-red-600"> Field is mandatory</span> : null}</label>
                        <Form.Item name={"name"} required id="name">
                            <Input placeholder="E.g. Microsoft Research" />
                        </Form.Item>
                    </div>
                    <div>
                        <label id="type"> Project type <span className="text-red-600">*</span>{validation.type.validated ? <span className="text-red-600"> Field is mandatory</span> : null}</label>
                        <Form.Item name={"type"} required id="type">
                            <Select onChange={checkCompanies} showSearch options={[
                                { value: "company", label: "Company research" },
                                { value: "managment", label: "Managment research" },
                                { value: "industry", label: "Industry research" },
                            ]} />
                        </Form.Item>
                    </div>
                    <div style={{ display: showCompanies ? "block" : "none" }}>
                        <label id="companies"> Companies <span className="text-red-600">*</span>{validation.companies.validated ? <span className="text-red-600"> Field is mandatory</span> : null}</label>
                        <Form.Item name={"companies"} required id="companies">
                            <Input placeholder="E.g Microsoft" />
                        </Form.Item>
                    </div>
                    <div>
                        <label id="description"> Project description</label>
                        <Form.Item name={"description"} id="description">
                            <Input placeholder="Please define the purpose for this project." />
                        </Form.Item>
                    </div>
                    <div>
                        <label id="scope"> Project scope</label>
                        <Form.Item name={"scope"} id="scope">
                            <Input placeholder="Tell us the range for the numbers of experts you want us to include for this research and the type of experts in order for us to start expert screening stage." />
                        </Form.Item>
                    </div>
                    <div>
                        <label id="expert"> Expert <span className="text-red-600">*</span>{validation.expert.validated ? <span className="text-red-600"> Field is mandatory</span> : null}</label>
                        <Form.Item name={"expert"} id="expert" style={{ display: "none" }}>
                            <Select mode="multiple" />
                        </Form.Item>
                        <div className="check-group">
                            <Checkbox onClick={() => { checkControl("all") }} checked={experts.all} className="my-check-item" value="all">All</Checkbox>
                            <Checkbox onClick={() => { checkControl("industry") }} checked={experts.industry} className="my-check-item" value="industry">Industry Consultant</Checkbox>
                            <Checkbox onClick={() => { checkControl("competitor") }} checked={experts.competitor} className="my-check-item" value="competitor">Competitor</Checkbox>
                            <Checkbox onClick={() => { checkControl("executive") }} checked={experts.executive} className="my-check-item" value="executive">Former Executive</Checkbox>
                            <Checkbox onClick={() => { checkControl("costumer") }} checked={experts.costumer} className="my-check-item" value="costumer">Costumer</Checkbox>
                            <Checkbox onClick={() => { checkControl("partner") }} checked={experts.partner} className="my-check-item" value="partner">Partner</Checkbox>
                        </div>
                    </div>
                    <div className="form-buttons">
                        <button>Cancel</button>
                        <button className="submit-button" onClick={submit}>
                            Submit
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
