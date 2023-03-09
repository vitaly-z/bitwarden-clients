import { mock } from "jest-mock-extended";

import { MigrationBuilder } from "./migration-builder";
import { MigrationHelper } from "./migration-helper";
import { Migrator } from "./migrator";

describe("MigrationBuilder", () => {
  class TestMigrator extends Migrator<0, 1> {
    async migrate(helper: MigrationHelper): Promise<void> {
      return;
    }

    async rollback(helper: MigrationHelper): Promise<void> {
      return;
    }
  }

  let sut: MigrationBuilder<number>;

  beforeEach(() => {
    sut = MigrationBuilder.create();
  });

  it("should be able to create a new MigrationBuilder", () => {
    expect(sut).toBeInstanceOf(MigrationBuilder);
  });

  it("should be able to add a migrator", () => {
    sut.with(TestMigrator, 0, 1);
    const migrations = (sut as any).migrations;
    expect(migrations.length).toBe(1);
    expect(migrations[0]).toMatchObject({ migrator: expect.any(TestMigrator), direction: "up" });
  });

  it("should be able to add a rollback", () => {
    sut.with(TestMigrator, 0, 1).rollback(TestMigrator, 1, 0);
    const migrations = (sut as any).migrations;
    expect(migrations.length).toBe(2);
    expect(migrations[1]).toMatchObject({ migrator: expect.any(TestMigrator), direction: "down" });
  });

  describe("migrate", () => {
    let migrator: TestMigrator;
    let rollback_migrator: TestMigrator;

    beforeEach(() => {
      sut = sut.with(TestMigrator, 0, 1).rollback(TestMigrator, 1, 0);
      migrator = (sut as any).migrations[0].migrator;
      rollback_migrator = (sut as any).migrations[1].migrator;
    });

    it("should migrate", async () => {
      const helper = new MigrationHelper(0, mock());
      const spy = jest.spyOn(migrator, "migrate");
      await sut.migrate(helper);
      expect(spy).toBeCalledWith(helper);
    });

    it("should rollback", async () => {
      const helper = new MigrationHelper(1, mock());
      const spy = jest.spyOn(rollback_migrator, "rollback");
      await sut.migrate(helper);
      expect(spy).toBeCalledWith(helper);
    });

    it("should update version on migrate", async () => {
      const helper = new MigrationHelper(0, mock());
      const spy = jest.spyOn(migrator, "updateVersion");
      await sut.migrate(helper);
      expect(spy).toBeCalledWith(helper, "up");
    });

    it("should update version on rollback", async () => {
      const helper = new MigrationHelper(1, mock());
      const spy = jest.spyOn(rollback_migrator, "updateVersion");
      await sut.migrate(helper);
      expect(spy).toBeCalledWith(helper, "down");
    });

    it("should not run the migrator if the current version does not match the from version", async () => {
      const helper = new MigrationHelper(3, mock());
      const migrate = jest.spyOn(migrator, "migrate");
      const rollback = jest.spyOn(rollback_migrator, "rollback");
      await sut.migrate(helper);
      expect(migrate).not.toBeCalled();
      expect(rollback).not.toBeCalled();
    });

    it("should not update version if the current version does not match the from version", async () => {
      const helper = new MigrationHelper(3, mock());
      const migrate = jest.spyOn(migrator, "updateVersion");
      const rollback = jest.spyOn(rollback_migrator, "updateVersion");
      await sut.migrate(helper);
      expect(migrate).not.toBeCalled();
      expect(rollback).not.toBeCalled();
    });
  });
});
