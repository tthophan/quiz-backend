import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'
import { appStorage } from '../storage'
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect()
    Object.assign(
      this,
      this.$extends({
        query: {
          $allModels: {
            async create({ model, args, query }) {
              const fields = Prisma.dmmf.datamodel.models
                .find(m => m.name === model)
                .fields.map(d => d.name)
              if (fields.includes('createdBy') && args.data)
                args.data['createdBy'] =
                  appStorage?.getStore()?.request?.scopeVariable?.session
                    ?.userId ?? "0"

              return query(args)
            },
            async update({ model, args, query }) {
              const fields = Prisma.dmmf.datamodel.models
                .find(m => m.name === model)
                .fields.map(d => d.name)
              if (fields.includes('updatedBy') && args.data)
                args.data['updatedBy'] =
                  appStorage?.getStore()?.request?.scopeVariable?.session
                    ?.userId ?? "0"

              return query(args)
            },
            async upsert({ model, args, query }) {
              const fields = Prisma.dmmf.datamodel.models
                .find(m => m.name === model)
                .fields.map(d => d.name)
              if (fields.includes('updatedBy') && args.update)
                args.update['updatedBy'] =
                  appStorage?.getStore()?.request?.scopeVariable?.session
                    ?.userId ?? "0"

              if (fields.includes('createdBy') && args.create)
                args.create['createdBy'] =
                  appStorage?.getStore()?.request?.scopeVariable?.session
                    ?.userId ?? "0"

              return query(args)
            },
          },
        },
      }),
    )
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
