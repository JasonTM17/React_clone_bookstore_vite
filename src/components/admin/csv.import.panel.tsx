import { useMemo, useState } from 'react'
import { Alert, Card, Table, Typography, Upload, message } from 'antd'
import type { UploadProps } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { parseCsvText, type ParsedCsvResult } from '../../services/csv.service'

type CsvImportPanelProps = {
  title: string
  entityLabel: string
}

function CsvImportPanel({ title, entityLabel }: CsvImportPanelProps) {
  const [result, setResult] = useState<ParsedCsvResult | null>(null)

  const columns = useMemo<ColumnsType<Record<string, string>>>(() => {
    if (!result) {
      return []
    }

    return result.headers.map((header) => ({
      key: header,
      title: header,
      dataIndex: header,
      ellipsis: true,
    }))
  }, [result])

  const dataSource = useMemo(() => {
    if (!result) {
      return []
    }

    return result.rows.map((row, index) => ({
      ...row,
      key: `${index}-${row[result.headers[0]] ?? ''}`,
    }))
  }, [result])

  const uploadProps: UploadProps = {
    name: 'file',
    accept: '.csv',
    maxCount: 1,
    showUploadList: false,
    beforeUpload: async (file) => {
      try {
        const text = await file.text()
        const parsed = parseCsvText(text)

        setResult(parsed)
        message.success(`Đã nhận ${parsed.rows.length} ${entityLabel} từ CSV`)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Không thể đọc file CSV'
        message.error(errorMessage)
      }

      return false
    },
  }

  return (
    <Card style={{ marginBottom: 16 }}>
      <Typography.Title level={5} style={{ marginTop: 0 }}>
        {title}
      </Typography.Title>

      <Upload.Dragger {...uploadProps}>
        <Typography.Text strong>Kéo thả file CSV vào đây hoặc bấm để chọn file</Typography.Text>
        <br />
        <Typography.Text type="secondary">Hỗ trợ định dạng: .csv</Typography.Text>
      </Upload.Dragger>

      {result && (
        <>
          <Alert
            style={{ marginTop: 12 }}
            type="success"
            message={`Đã nhận ${result.rows.length} ${entityLabel}`}
            description={`Cột nhận được: ${result.headers.join(', ')}`}
            showIcon
          />
          <Table
            style={{ marginTop: 12 }}
            size="small"
            columns={columns}
            dataSource={dataSource}
            pagination={{ pageSize: 5 }}
            scroll={{ x: true }}
          />
        </>
      )}
    </Card>
  )
}

export default CsvImportPanel